/* Visualizador 3D dos óculos (Three.js via CDN, carregado só quando existe #v3d).
 *
 * Modelo exibido: models/oculos.stl (Style Frame Glasses, MakerWorld).
 * Também aceita models/oculos.glb / .gltf / .3mf (nessa ordem de preferência).
 * Se o navegador não deixar ler o arquivo (site aberto direto do disco, file://),
 * usa a cópia embutida em models/oculos-stl.js. Só se tudo falhar aparece o modelo
 * genérico gerado pelo código (e um aviso no console).
 *
 * Ajustes rápidos: */
const V3D = {
  velocidade: 0.6,      // rad/s da rotação automática
  inicioY: -0.55,       // ângulo inicial (um pouco de lado, dá mais volume)
  inclinacaoX: 0.12,    // leve inclinação para ver por cima
  tamanho: 2.5,         // maior dimensão do modelo na cena
  stlRotX: Math.PI / 2, // STL/3MF vêm na posição de impressão (Z para cima, óculos de ponta-cabeça):
                        // +90° em X deixa os óculos em pé e de frente (valor certo para o arquivo atual)
  corLente: 0xbcd9ff,
  cor: 0x121212         // cor dos óculos (preto). Use null para seguir a cor do tema (azul).
                        // No modo de alto contraste (fundo preto) ele usa a cor do tema, para não sumir.
};

(function () {
  let atual = null;          // instância montada (para limpar no próximo render)
  let modeloCache = null;    // promessa do modelo carregado (null = ainda não tentou)
  let ficha = 0;             // evita montar duas vezes se render() rodar em sequência

  const THREE_URL = 'three';

  async function arquivoExiste(url) {
    try { const r = await fetch(url, { method: 'HEAD' }); return r.ok; } catch (e) { return false; }
  }

  // monta o grupo a partir da geometria do STL
  async function grupoDeSTL(THREE, geo) {
    try { // sombreamento suave nas curvas, mantendo as quinas vivas
      const { toCreasedNormals } = await import('three/addons/utils/BufferGeometryUtils.js');
      geo = toCreasedNormals(geo, Math.PI / 5);
    } catch (e) { geo.computeVertexNormals(); }
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x888888 }));
    m.userData.corTema = true;
    const g = new THREE.Group(); g.add(m); g.userData.zUp = true; return g;
  }

  // cópia embutida (funciona em file://, sem fetch)
  function carregarEmbutido() {
    return new Promise((ok, falha) => {
      if (window.OCULOS_STL_B64) return ok(window.OCULOS_STL_B64);
      const s = document.createElement('script');
      s.src = 'models/oculos-stl.js';
      s.onload = () => (window.OCULOS_STL_B64 ? ok(window.OCULOS_STL_B64) : falha(new Error('vazio')));
      s.onerror = () => falha(new Error('models/oculos-stl.js não encontrado'));
      document.head.appendChild(s);
    });
  }

  async function carregarArquivo(THREE) {
    const tentativas = [
      ['models/oculos.glb', async (u) => {
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        const g = await new GLTFLoader().loadAsync(u); return g.scene;
      }],
      ['models/oculos.gltf', async (u) => {
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        const g = await new GLTFLoader().loadAsync(u); return g.scene;
      }],
      ['models/oculos.stl', async (u) => {
        const { STLLoader } = await import('three/addons/loaders/STLLoader.js');
        return grupoDeSTL(THREE, await new STLLoader().loadAsync(u));
      }],
      ['models/oculos.3mf', async (u) => {
        const { ThreeMFLoader } = await import('three/addons/loaders/3MFLoader.js');
        const g = await new ThreeMFLoader().loadAsync(u); g.userData.zUp = true; return g;
      }]
    ];
    for (const [url, fn] of tentativas) {
      if (await arquivoExiste(url)) {
        try { const r = await fn(url); console.info('Viewer 3D: modelo carregado de ' + url); return r; }
        catch (e) { console.warn('Viewer 3D: falha ao ler ' + url, e); }
      }
    }
    // nada lido por fetch (provavelmente file://): usa a cópia embutida do STL
    try {
      const b64 = await carregarEmbutido();
      const bin = atob(b64), buf = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
      const { STLLoader } = await import('three/addons/loaders/STLLoader.js');
      const r = await grupoDeSTL(THREE, new STLLoader().parse(buf.buffer));
      console.info('Viewer 3D: modelo carregado da cópia embutida (models/oculos-stl.js)');
      return r;
    } catch (e) { console.warn('Viewer 3D: cópia embutida indisponível.', e); }
    console.warn('Viewer 3D: nenhum arquivo de modelo encontrado, usando o modelo genérico.');
    return null;
  }

  function oculosProcedural(THREE, cor) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: cor, roughness: 0.38, metalness: 0.05 });
    const lente = new THREE.MeshStandardMaterial({
      color: V3D.corLente, roughness: 0.08, metalness: 0, transparent: true, opacity: 0.22,
      side: THREE.DoubleSide, depthWrite: false
    });
    const rr = (Cls, w, h, r) => {
      const s = new Cls(), x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
    };
    const aro = () => {
      const f = rr(THREE.Shape, 1.0, 0.8, 0.22);
      f.holes.push(rr(THREE.Path, 0.8, 0.6, 0.14));
      const geo = new THREE.ExtrudeGeometry(f, {
        depth: 0.14, bevelEnabled: true, bevelSize: 0.022, bevelThickness: 0.022, bevelSegments: 3, curveSegments: 18
      });
      geo.translate(0, 0, -0.07);
      return geo;
    };
    const vidro = () => new THREE.ShapeGeometry(rr(THREE.Shape, 0.8, 0.6, 0.14), 18);
    [-1, 1].forEach((s) => {
      const a = new THREE.Mesh(aro(), mat); a.position.x = s * 0.575; g.add(a);
      const v = new THREE.Mesh(vidro(), lente); v.position.x = s * 0.575; g.add(v);
      const dob = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.16), mat);
      dob.position.set(s * 1.1, 0.26, -0.08); g.add(dob);
      const haste = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.1, 2.0), mat);
      haste.position.set(s * 1.1, 0.26, -1.14); g.add(haste);
      const ponta = new THREE.Group(); ponta.position.set(s * 1.1, 0.26, -2.14);
      const pm = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.1, 0.5), mat); pm.position.z = -0.23;
      ponta.add(pm); ponta.rotation.x = -0.55; g.add(ponta);
    });
    const ponte = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.035, 12, 28, Math.PI), mat);
    ponte.position.set(0, 0.14, 0); g.add(ponte);
    return g;
  }

  function limpar() {
    if (!atual) return;
    atual.parar = true;
    try { atual.ro && atual.ro.disconnect(); atual.io && atual.io.disconnect(); } catch (e) {}
    try { atual.renderer.dispose(); atual.renderer.forceContextLoss(); } catch (e) {}
    atual = null;
  }

  window.mount3d = async function () {
    const el = document.getElementById('v3d');
    const minha = ++ficha;
    limpar();
    if (!el) return;
    let THREE;
    try {
      THREE = await import(THREE_URL);
    } catch (e) { console.warn('Viewer 3D: Three.js indisponível (sem internet?), mantendo a imagem.', e); return; }
    if (!el.isConnected || minha !== ficha) return;   // outro render já substituiu o elemento

    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch (e) { console.warn('Viewer 3D: WebGL indisponível, mantendo a imagem.', e); return; }

    const cor = (V3D.cor != null && !document.documentElement.hasAttribute('data-hc'))
      ? new THREE.Color(V3D.cor)
      : new THREE.Color((getComputedStyle(document.documentElement).getPropertyValue('--ac') || '#1769E0').trim());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const cena = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(32, 16 / 9, 0.1, 100);
    cena.add(new THREE.HemisphereLight(0xffffff, 0x9fb4cc, 1.5));
    const l1 = new THREE.DirectionalLight(0xffffff, 2.4); l1.position.set(3, 4, 5); cena.add(l1);
    const l2 = new THREE.DirectionalLight(0xffffff, 1.0); l2.position.set(-4, 1, -3); cena.add(l2);

    // modelo: arquivo em models/ (ou cópia embutida) ou, em último caso, procedural
    if (modeloCache === null) modeloCache = carregarArquivo(THREE);
    const base = await modeloCache;
    if (!el.isConnected || minha !== ficha) { renderer.dispose(); return; }
    let modelo;
    const doArquivo = !!base;
    if (base) {
      modelo = base.clone(true);
      if (modelo.userData.zUp || base.userData.zUp) modelo.rotation.x = V3D.stlRotX;
      modelo.traverse((o) => {
        if (o.userData && o.userData.corTema)
          o.material = new THREE.MeshStandardMaterial({ color: cor, roughness: 0.32, metalness: 0.1 });
      });
    } else modelo = oculosProcedural(THREE, cor);

    // centraliza e normaliza o tamanho
    const envolve = new THREE.Group(); envolve.add(modelo);
    envolve.updateMatrixWorld(true);
    const caixa = new THREE.Box3().setFromObject(envolve);
    const centro = caixa.getCenter(new THREE.Vector3()), tam = caixa.getSize(new THREE.Vector3());
    const esc = V3D.tamanho / Math.max(tam.x, tam.y, tam.z, 1e-6);
    modelo.position.sub(centro);
    envolve.scale.setScalar(esc);
    const gira = new THREE.Group(); gira.add(envolve); cena.add(gira);
    gira.rotation.set(V3D.inclinacaoX, V3D.inicioY, 0);
    cam.position.set(0, 0.2, 7.2); cam.lookAt(0, 0, 0);

    // troca a imagem de reserva pelo canvas
    el.querySelectorAll('img').forEach((i) => i.remove());
    el.appendChild(renderer.domElement);
    el.dataset.modelo = doArquivo ? 'arquivo' : 'generico';

    const st = { renderer, parar: false, visivel: true };
    atual = st;

    // o canvas fica absoluto (CSS) e NUNCA define o tamanho da caixa: quem manda é o 16:9 do container
    const ajusta = () => {
      const w = el.clientWidth || 600, h = el.clientHeight || 340;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.position.z = 7.2 * Math.max(1, (16 / 9) / cam.aspect); // enquadra em telas estreitas
      cam.lookAt(0, 0, 0);
      cam.updateProjectionMatrix();
    };
    ajusta();
    if ('ResizeObserver' in window) { st.ro = new ResizeObserver(ajusta); st.ro.observe(el); }
    else window.addEventListener('resize', ajusta);
    if ('IntersectionObserver' in window) {
      st.io = new IntersectionObserver((es) => { st.visivel = es[0].isIntersecting; }, { threshold: 0 });
      st.io.observe(el);
    }

    // arrastar para girar (rolagem vertical da página continua funcionando)
    let arrasta = false, ux = 0, uy = 0, pausaAte = 0;
    el.addEventListener('pointerdown', (e) => { arrasta = true; ux = e.clientX; uy = e.clientY; el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing'; });
    el.addEventListener('pointermove', (e) => {
      if (!arrasta) return;
      gira.rotation.y += (e.clientX - ux) * 0.01;
      gira.rotation.x = Math.max(-0.6, Math.min(0.9, gira.rotation.x + (e.clientY - uy) * 0.004));
      ux = e.clientX; uy = e.clientY;
    });
    const solta = () => { arrasta = false; pausaAte = performance.now() + 1500; el.style.cursor = ''; };
    el.addEventListener('pointerup', solta); el.addEventListener('pointercancel', solta);

    const reduz = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t0 = performance.now();
    const quadro = (t) => {
      if (st.parar || !el.isConnected) { limpar(); return; }
      const dt = Math.min((t - t0) / 1000, 0.1); t0 = t;
      if (st.visivel && !document.hidden) {
        if (!reduz && !arrasta && t > pausaAte) gira.rotation.y += V3D.velocidade * dt;
        renderer.render(cena, cam);
      }
      requestAnimationFrame(quadro);
    };
    requestAnimationFrame(quadro);
  };

  // se o app já renderizou a home antes deste script carregar
  if (document.readyState !== 'loading') window.mount3d(); else document.addEventListener('DOMContentLoaded', () => window.mount3d());
})();
