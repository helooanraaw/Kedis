(function () {
  var G = {}
  // ── constants ──
  G.CW = 320
  G.CH = 180
  G.GROUND = 140
  G.WORLD = 1000 // Tighter world size for faster, more engaging gameplay!
  G.SPEED = 1.8
  G.ITEM_RANGE = 16
  G.BIN_RANGE = 22
  G.isPlaying = false

  // ── bitmap pixel font (5×7 with 1px spacing) ──
  var FONT = {
    'A':[14,17,17,31,17,17,17], 'B':[30,17,17,30,17,17,30],
    'C':[14,17,16,16,16,17,14], 'D':[30,17,17,17,17,17,30],
    'E':[31,16,16,30,16,16,31], 'F':[31,16,16,30,16,16,16],
    'G':[14,17,16,23,17,17,14], 'H':[17,17,17,31,17,17,17],
    'I':[14,4,4,4,4,4,14],      'J':[1,1,1,1,1,17,14],
    'K':[17,18,20,24,20,18,17], 'L':[16,16,16,16,16,16,31],
    'M':[17,27,21,21,17,17,17], 'N':[17,25,21,19,17,17,17],
    'O':[14,17,17,17,17,17,14], 'P':[30,17,17,30,16,16,16],
    'Q':[14,17,17,17,21,18,13], 'R':[30,17,17,30,20,18,17],
    'S':[15,16,16,14,1,1,30],   'T':[31,4,4,4,4,4,4],
    'U':[17,17,17,17,17,17,14], 'V':[17,17,17,17,10,10,4],
    'W':[17,17,17,21,21,27,17], 'X':[17,17,10,4,10,17,17],
    'Y':[17,17,10,4,4,4,4],     'Z':[31,1,2,4,8,16,31],
    '0':[14,19,21,21,21,25,14], '1':[4,12,4,4,4,4,14],
    '2':[14,17,1,2,4,8,31],     '3':[14,17,1,6,1,17,14],
    '4':[2,6,10,18,31,2,2],     '5':[31,16,30,1,1,17,14],
    '6':[6,8,16,30,17,17,14],   '7':[31,1,2,4,8,8,8],
    '8':[14,17,17,14,17,17,14], '9':[14,17,17,15,1,1,14],
    '!':[4,4,4,4,4,0,4],        ':':[0,4,0,0,0,4,0],
    '.':[0,0,0,0,0,0,4],        '-':[0,0,0,31,0,0,0],
    '/':[1,1,2,4,8,16,16],
  }
  FONT[' '] = [0,0,0,0,0,0,0]

  function drawText(text, x, y, col, scale) {
    scale = scale || 1
    var spacing = 6
    var textUpper = text.toUpperCase()
    for (var i = 0; i < textUpper.length; i++) {
      var ch = textUpper[i]
      var data = FONT[ch]
      if (!data) continue
      var xo = x + i * spacing * scale
      for (var row = 0; row < 7; row++) {
        for (var sc = 0; sc < scale; sc++) {
          for (var colBit = 0; colBit < 5; colBit++) {
            if (data[row] & (16 >> colBit)) {
              rect(xo + colBit * scale + (scale > 1 ? 0 : 0), y + row * scale + sc, scale, 1, col)
            }
          }
        }
      }
    }
  }

  function measureTextWidth(text, scale) {
    scale = scale || 1
    return text.length * 6 * scale
  }

  // palette (extended for detailed pixel art)
  var P = {
    sky:       '#0f0f23',
    skyMid:    '#1a1a2e',
    skyLow:    '#16213e',
    grass:     '#2d5a1e',
    grassD:    '#1e3d12',
    grassL:    '#4a8a2e',
    dirt:      '#5c3a1e',
    org:       '#27ae60',
    orgD:      '#1b6e3e',
    orgL:      '#4caf50',
    ano:       '#2980b9',
    anoD:      '#1a5f8f',
    anoL:      '#42a5f5',
    b3:        '#e74c3c',
    b3D:       '#b71c1c',
    b3L:       '#ef5350',
    outline:   '#111',
    skin:      '#f4c28c',
    skinS:     '#d4a86a',
    hair:      '#5a3a1a',
    hairD:     '#3a2210',
    hairL:     '#7a5a3a',
    cap:       '#2e7d32',
    capD:      '#1b5e20',
    capL:      '#4caf50',
    shirt:     '#388e3c',
    shirtD:    '#2e7d32',
    shirtL:    '#4caf50',
    pants:     '#6d4c2a',
    pantsD:    '#4e3422',
    pantsL:    '#8d6e3a',
    shoe:      '#2c2c2c',
    shoeD:     '#111',
    shoeL:     '#555',
    backpack:  '#1565c0',
    backD:     '#0d47a1',
    backL:     '#42a5f5',
    strap:     '#5d4037',
    belt:      '#3e2723',
    glove:     '#8d6e3a',
    white:     '#f0f0f0',
    gray:      '#555',
    score:     '#f1c40f',
    star:      '#ffd700',
    red:       '#e74c3c',
    winFrame:  '#2ecc71',
    building1: '#1a1a3a',
    building2: '#1e1e42',
    building3: '#252550',
    itemOrg:   '#ff8a65',
    itemOrgD:  '#e64a19',
    itemAno:   '#64b5f6',
    itemAnoD:  '#1976d2',
    itemB3:    '#ef5350',
    itemB3D:   '#c62828',
    yellow:    '#ffeb3b',
    orange:    '#ff9800',
    brown:     '#795548',
    brownD:    '#4e3422',
    silver:    '#bdbdbd',
    silverD:   '#757575',
    gold:      '#ffc107',
  }



  // ── canvas ──
  var cv = document.getElementById('game-canvas')
  var cvBg = document.getElementById('game-bg-canvas')
  if (!cv) { console.error('KEDIS: canvas not found'); return }
  var cx = cv.getContext('2d')
  var cxBg = cvBg ? cvBg.getContext('2d') : null
  if (!cx) { console.error('KEDIS: canvas 2d context failed'); return }
  cv.width = G.CW
  cv.height = G.CH
  if (cvBg) {
    cvBg.width = G.CW
    cvBg.height = G.CH
  }

  // ── store scale/offset → matches CSS object-fit:contain ──
  function resizeGame() {
    var container = cv.parentElement
    if (!container) return
    var cw = container.clientWidth
    var ch = container.clientHeight
    if (cw < 10 || ch < 10) { cw = G.CW; ch = G.CH }
    var sc = Math.min(cw / G.CW, ch / G.CH)
    var dw = G.CW * sc
    var dh = G.CH * sc
    G._s = sc
    G._ox = (cw - dw) / 2
    G._oy = (ch - dh) / 2
  }

  // ── state ──
  var state = {
    charX: 0,
    charY: 0,
    charDir: 1,
    charFrame: 0,
    frameTimer: 0,
    moving: false,
    carrying: null,

    camX: 0,

    score: 0,
    highscore: 0,

    bins: [],
    items: [],
    particles: [],
    shakeX: 0,
    shakeY: 0,
    shakeTimer: 0,

    flashText: '',
    flashTimer: 0,
    flashColor: P.star,

    stateLock: false,
    stateTimer: 0,
    pickupAnimTimer: 0,

    keys: { left: false, right: false, space: false, spaceUsed: false },
    time: 0,
  }

  // ── pool ──
  var pool = [
    { label:'Apel Busuk',       cat:'organik',    icon:0 },
    { label:'Bonggol Jagung',   cat:'organik',    icon:1 },
    { label:'Daun Kering',      cat:'organik',    icon:2 },
    { label:'Pisang Busuk',     cat:'organik',    icon:3 },
    { label:'Tulang Ikan',      cat:'organik',    icon:4 },
    { label:'Botol Plastik',    cat:'anorganik',  icon:5 },
    { label:'Bungkus Snack',    cat:'anorganik',  icon:6 },
    { label:'Kaleng Bekas',     cat:'anorganik',  icon:7 },
    { label:'Sterofoam',        cat:'anorganik',  icon:8 },
    { label:'Baterai Bekas',    cat:'b3',          icon:9 },
    { label:'HP Rusak',         cat:'b3',          icon:10 },
    { label:'Kaleng Gas',       cat:'b3',          icon:11 },
    { label:'Lampu Pecah',      cat:'b3',          icon:12 },
    { label:'Termometer Retak', cat:'b3',          icon:13 },
  ]

  // ── SVG asset paths (maps icon index → file) ──
  var SVG_PATHS = [
    'assets/sampah/organik/ApelGigit.svg',
    'assets/sampah/organik/JagungSampah.svg',
    'assets/sampah/organik/KumpulandaunKering.svg',
    'assets/sampah/organik/PisangBusuk.svg',
    'assets/sampah/organik/TulangIkan.svg',
    'assets/sampah/anorganik/BotolPlastikBekas.svg',
    'assets/sampah/anorganik/BungkusanSnack.svg',
    'assets/sampah/anorganik/KalengBekas.svg',
    'assets/sampah/anorganik/Sterofoam.svg',
    'assets/sampah/b3/BateraiBusuk.svg',
    'assets/sampah/b3/Handphonehancur.svg',
    'assets/sampah/b3/KalengGasRongsok.svg',
    'assets/sampah/b3/LampuPecah.svg',
    'assets/sampah/b3/TermometerRetak.svg',
  ]
  var iconImages = []

  var BIRD_PATHS = [
    'assets/game/bird/idle-bird.svg',
    'assets/game/bird/walk1-bird.svg',
    'assets/game/bird/walk2-bird.svg',
    'assets/game/bird/walk3-bird.svg',
    'assets/game/bird/pickUp-bird.svg',
  ]
  var birdImages = []

  var CONSTR_PATHS = [
    'assets/game/construction/Gedung1.svg',
    'assets/game/construction/gedung2.svg',
    'assets/game/construction/gedung-tinggi2.svg',
    'assets/game/construction/gedung-tinggi-cokelat1.svg',
    'assets/game/construction/gedung-tinggi-3.svg',
    'assets/game/construction/pohon-normal.svg',
    'assets/game/construction/pohon-besar.svg',
    'assets/game/construction/tiang-lampu.svg',
    'assets/game/construction/tanah.svg',
    'assets/game/construction/langit.svg',
  ]
  var constrImages = []


  // BIRD enum
  var B = { IDLE:0, WALK1:1, WALK2:2, WALK3:3, PICKUP:4 }

  function preloadImages(callback) {
    var loaded = 0
    var total = SVG_PATHS.length + BIRD_PATHS.length + CONSTR_PATHS.length
    function checkDone() {
      loaded++
      if (loaded >= total) { if (callback) callback() }
    }
    for (var i = 0; i < SVG_PATHS.length; i++) {
      ;(function(idx){
        var img = new Image()
        img.onload = checkDone
        img.onerror = checkDone
        img.src = SVG_PATHS[idx]
        iconImages[idx] = img
      })(i)
    }
    for (var j = 0; j < BIRD_PATHS.length; j++) {
      ;(function(idx){
        var img = new Image()
        img.onload = checkDone
        img.onerror = checkDone
        img.src = BIRD_PATHS[idx]
        birdImages[idx] = img
      })(j)
    }
    for (var k = 0; k < CONSTR_PATHS.length; k++) {
      ;(function(idx){
        var img = new Image()
        img.onload = checkDone
        img.onerror = checkDone
        img.src = CONSTR_PATHS[idx]
        constrImages[idx] = img
      })(k)
    }
  }

  // ── sprite system: all SVG elements in DOM, insertion order = back→front ──
  var sprites = []
  var spriteLayer

  function initSprites() {
    spriteLayer = document.getElementById('game-sprite-layer')
    if (!spriteLayer) return
    spriteLayer.innerHTML = ''
    sprites = []

    // 1) BUILDINGS (parallax 0.2) — dynamically tiled side-by-side with overlap
    var bX = []
    for (var x = -70; x < G.WORLD + 80; x += 45) {
      bX.push(x)
    }
    for (var i = 0; i < bX.length; i++) {
      var srcIdx = i % 5
      var el = document.createElement('img')
      el.src = CONSTR_PATHS[srcIdx]
      el.draggable = false
      el.style.display = 'none'
      spriteLayer.appendChild(el)
      var yOffset = (srcIdx === 1 || srcIdx === 2) ? 12 : (srcIdx === 4) ? 8 : 0
      sprites.push({ el:el, x:bX[i], w:110, h:145, parallax:0.2, yOffset:yOffset })
    }

    // 2) TREES (parallax 0.35)
    var tX = [70, 190, 310, 430, 550, 670, 790, 910]
    for (var i = 0; i < tX.length; i++) {
      var srcIdx = 5 + (i % 2)
      var el = document.createElement('img')
      el.src = CONSTR_PATHS[srcIdx]
      el.draggable = false
      el.style.display = 'none'
      spriteLayer.appendChild(el)
      sprites.push({ el:el, x:tX[i], w:80, h:85, parallax:0.35 })
    }

    // 3) LAMP POSTS (parallax 0.5)
    var lX = [120, 240, 360, 480, 600, 720, 840, 960]
    for (var i = 0; i < lX.length; i++) {
      var el = document.createElement('img')
      el.src = CONSTR_PATHS[7]
      el.draggable = false
      el.style.display = 'none'
      spriteLayer.appendChild(el)
      sprites.push({ el:el, x:lX[i], w:30, h:95, parallax:0.5 })
    }

    // 5) bins (pixel-art DOM, between lamps and items)
    var binBox = document.createElement('div')
    binBox.id = 'game-bin-box'
    spriteLayer.appendChild(binBox)

    // 6) items (dynamic, managed in drawItemsDOM)
    var itemBox = document.createElement('div')
    itemBox.id = 'game-item-box'
    spriteLayer.appendChild(itemBox)

    // 7) bird sprite (frontmost game element)
    var birdEl = document.createElement('img')
    birdEl.draggable = false
    birdEl.id = 'game-bird-sprite'
    birdEl.style.display = 'none'
    spriteLayer.appendChild(birdEl)

    // 8) carry image (above bird)
    var carryEl = document.createElement('img')
    carryEl.draggable = false
    carryEl.id = 'game-carry-img'
    carryEl.style.display = 'none'
    spriteLayer.appendChild(carryEl)
  }

  function drawSprites() {
    if (!spriteLayer) return
    var camX = state.camX
    var s = G._s || 1
    var bx = G._ox || 0
    var by = G._oy || 0

    // draw static sprites (buildings, trees, lamps)
    for (var i = 0; i < sprites.length; i++) {
      var sp = sprites[i]
      var sx = sp.x - camX * sp.parallax
      if (sx < -sp.w - 20 || sx > G.CW + 20) { sp.el.style.display = 'none'; continue }
      sp.el.style.display = 'block'
      var spW = sp.w * s
      var spH = sp.h * s
      sp.el.style.width = Math.round(spW) + 'px'
      sp.el.style.height = Math.round(spH) + 'px'
      var yOffset = sp.yOffset || 0
      var topPx = by + G.GROUND * s - spH + yOffset * s
      sp.el.style.transform = 'translate(' + (bx + sx * s) + 'px,' + topPx + 'px)'

      // Crop the bottom of background sprites if they extend onto the ground
      var bottomPx = topPx + spH
      var groundPx = by + G.GROUND * s
      if (bottomPx > groundPx) {
        var overlap = bottomPx - groundPx
        sp.el.style.clipPath = 'inset(0 0 ' + Math.round(overlap) + 'px 0)'
      } else {
        sp.el.style.clipPath = 'none'
      }
    }

    // bins (DOM pixel-art)
    drawBinsDOM(bx, by, s)
    // items
    drawItemsDOM(bx, by, s)
    // bird + carry
    drawBirdDOM(bx, by, s)
  }

  // ── helpers ──
  function rnd(a, b) { return a + Math.random() * (b - a) }

  function rndInt(a, b) { return Math.floor(rnd(a, b + 1)) }

  function clamp(v, mn, mx) { return v < mn ? mn : v > mx ? mx : v }

  function dist(x1, y1, x2, y2) {
    var dx = x1 - x2
    var dy = y1 - y2
    return Math.sqrt(dx * dx + dy * dy)
  }

  function getActionLabel() {
    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    return isTouch ? 'AKSI' : 'SPACE'
  }

  // ── glitch-pixel line: runs of same colour ──
  function rect(x, y, w, h, col, context) {
    if (!col || col === '') return
    var targetCtx = context || cx
    targetCtx.fillStyle = col
    targetCtx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h))
  }

  // ── draw background ──

  function drawBG() {
    var drawCtx = cxBg || cx
    var camX = state.camX

    // ── sky (langit.svg slow panorama, less zoomed-in) ──
    var langit = constrImages[9]
    if (langit) {
      drawCtx.imageSmoothingEnabled = false
      var skyH = G.GROUND + 15
      var skyY = 8
      var skyW = langit.width ? (skyH * (langit.width / langit.height)) : (skyH * (2180 / 480))
      var maxScroll = G.WORLD - G.CW
      var maxSkyScroll = skyW - G.CW
      var parallax = maxScroll > 0 ? Math.min(0.5, maxSkyScroll / maxScroll) : 0
      var skyX = -camX * parallax
      drawCtx.drawImage(langit, skyX, skyY, skyW, skyH)
    } else {
      rect(0, 0, G.CW, G.CH, P.sky, drawCtx)
      for (var row = 0; row < G.GROUND - 1; row++) {
        var t = row / (G.GROUND - 2)
        var col = t < 0.4 ? P.sky : t < 0.65 ? P.skyMid : t < 0.85 ? P.skyLow : '#1c1c30'
        rect(0, row, G.CW, 1, col, drawCtx)
      }
    }

    // ── ground (tanah.svg repeated side-by-side) ──
    var tanah = constrImages[8]
    if (tanah) {
      drawCtx.imageSmoothingEnabled = false
      var tileW = 40
      var tileH = G.CH - G.GROUND
      for (var tx = 0; tx < G.WORLD; tx += tileW) {
        drawCtx.drawImage(tanah, Math.floor(tx - camX), G.GROUND, tileW + 1, tileH)
      }
    } else {
      // ── horizon line (only as fallback when tanah.svg is missing) ──
      rect(0, G.GROUND - 1, G.CW, 1, '#1a1a1a', drawCtx)

      drawCtx.imageSmoothingEnabled = false
      for (var gRow = G.GROUND; gRow < G.CH; gRow++) {
        var gCol = gRow < G.GROUND + 3 ? P.grassD : (gRow % 4 === 0) ? P.grassL : P.grass
        if (gRow >= G.GROUND + 15 && gRow <= G.GROUND + 25) { gCol = gRow % 3 === 0 ? '#4a3520' : '#5c3a1e' }
        rect(0, gRow, G.CW, 1, gCol, drawCtx)
      }
      rect(0, G.GROUND + 15, G.CW, 1, '#3a2510', drawCtx)
      rect(0, G.GROUND + 25, G.CW, 1, '#3a2510', drawCtx)
    }
  }

  // ── draw trash items on ground (DOM) ──
  function drawItemsDOM(baseX, baseY, scale) {
    var itemBox = document.getElementById('game-item-box')
    if (!itemBox) return
    var cxVal = getCharCenterX()
    var bobTime = (state.time || 0) * 3

    while (itemBox.children.length < state.items.length) {
      var el = document.createElement('img')
      el.style.position = 'absolute'
      el.style.left = '0'; el.style.top = '0'
      el.style.transformOrigin = '0 0'
      el.style.imageRendering = 'pixelated'
      itemBox.appendChild(el)
    }
    while (itemBox.children.length > state.items.length) {
      itemBox.removeChild(itemBox.lastChild)
    }

    for (var i = 0; i < state.items.length; i++) {
      var item = state.items[i]
      var sx = item.x - state.camX
      if (sx < -50 || sx > G.CW + 50) { itemBox.children[i].style.display = 'none'; continue }

      var bobY = Math.sin(bobTime + i * 1.5) * 1.5
      var iy = item.y + bobY

      var el = itemBox.children[i]
      el.style.display = 'block'
      el.src = SVG_PATHS[item.icon]
      var imgSz = Math.round(24 * scale)
      el.style.width = imgSz + 'px'
      el.style.height = imgSz + 'px'
      el.style.transform = 'translate(' + (baseX + sx * scale) + 'px,' + (baseY + iy * scale) + 'px)'

      // pickup indicator (on canvas)
      if (!state.carrying && !state.stateLock) {
        var d = dist(cxVal, getCharCenterY(), item.x + 12, item.y + 12)
        if (d < G.ITEM_RANGE) {
          var label = getActionLabel()
          var textW = measureTextWidth(label, 1)
          var w = textW + 10
          var bx = sx + 12 - w / 2
          var by = iy - 16
          rect(bx, by, w, 11, 'rgba(0,0,0,0.88)')
          rect(bx + 1, by + 1, w - 2, 1, 'rgba(255,255,255,0.08)')
          drawText(label, bx + (w - textW) / 2, by + 2, P.star, 1)
        }
      }
    }
  }

  // ── draw bird (DOM) ──
  function drawBirdDOM(baseX, baseY, scale) {
    var birdEl = document.getElementById('game-bird-sprite')
    var carryEl = document.getElementById('game-carry-img')
    if (!birdEl) return

    var sx = state.charX - state.camX - 6
    var sy = state.charY

    // shadow on canvas
    rect(sx + 3, sy + 28, 22, 2, 'rgba(0,0,0,0.2)')

    // frame
    var frameIdx
    if (state.pickupAnimTimer > 0) frameIdx = B.PICKUP
    else if (state.moving) frameIdx = [B.WALK1, B.WALK2, B.WALK3][state.charFrame]
    else frameIdx = B.IDLE

    var imgW = Math.round(24 * scale)
    var imgH = Math.round(38 * scale)

    birdEl.src = BIRD_PATHS[frameIdx]
    birdEl.style.display = 'block'
    birdEl.style.width = imgW + 'px'
    birdEl.style.height = imgH + 'px'
    birdEl.style.imageRendering = 'pixelated'
    birdEl.style.clipPath = frameIdx === B.IDLE ? 'inset(0 0 25% 0)' : 'none'
    if (state.charDir < 0) {
      birdEl.style.transform = 'translate(' + (baseX + (sx + 24) * scale) + 'px,' + (baseY + sy * scale) + 'px) scaleX(-1)'
    } else {
      birdEl.style.transform = 'translate(' + (baseX + sx * scale) + 'px,' + (baseY + sy * scale) + 'px)'
    }

    // carry item
    if (state.carrying && carryEl) {
      var csz = Math.round(24 * scale)
      carryEl.style.display = 'block'
      carryEl.src = SVG_PATHS[state.carrying.icon]
      carryEl.style.width = csz + 'px'
      carryEl.style.height = csz + 'px'
      carryEl.style.transform = 'translate(' + (baseX + sx * scale) + 'px,' + (baseY + (sy - 14) * scale) + 'px)'

      var cat = state.carrying.cat
      var catCol = cat === 'organik' ? P.orgL : cat === 'anorganik' ? P.anoL : P.b3L
      var text = state.carrying.label
      var textW = measureTextWidth(text, 1)
      var boxW = textW + 12
      var boxX = sx + 12 - boxW / 2
      var boxY = sy - 38
      rect(boxX, boxY, boxW, 11, 'rgba(0,0,0,0.88)')
      rect(boxX + 1, boxY + 1, boxW - 2, 1, 'rgba(255,255,255,0.08)')
      rect(boxX + 2, boxY + 2, 4, 7, catCol)
      drawText(text, boxX + 8, boxY + 2, P.white, 1)
    } else if (carryEl) {
      carryEl.style.display = 'none'
    }
  }

  // ── draw bins (DOM pixel-art) ──
  function drawBinsDOM(baseX, baseY, scale) {
    var binBox = document.getElementById('game-bin-box')
    if (!binBox) return

    while (binBox.children.length < state.bins.length) {
      var d = document.createElement('div')
      d.style.position = 'absolute'
      d.style.left = '0'; d.style.top = '0'
      binBox.appendChild(d)
    }
    while (binBox.children.length > state.bins.length) {
      binBox.removeChild(binBox.lastChild)
    }

    var cxVal = getCharCenterX()
    for (var i = 0; i < state.bins.length; i++) {
      var b = state.bins[i]
      var sx = b.x - state.camX
      if (sx < -20 || sx > G.CW + 20) { binBox.children[i].style.display = 'none'; continue }

      var binCol, binColD, binLabel
      if (b.type === 'organik') { binCol = '#4caf50'; binColD = '#2e7d32'; binLabel = 'O' }
      else if (b.type === 'anorganik') { binCol = '#2196f3'; binColD = '#1565c0'; binLabel = 'A' }
      else { binCol = '#ef5350'; binColD = '#c62828'; binLabel = 'B' }

      var bw = Math.round(16 * scale)
      var bh = Math.round(24 * scale)
      var bx = baseX + sx * scale
      var by = baseY + b.y * scale

      var el = binBox.children[i]
      el.style.display = 'block'
      el.style.width = bw + 'px'
      el.style.height = bh + 'px'
      el.style.transform = 'translate(' + bx + 'px,' + by + 'px)'
      el.style.backgroundColor = binCol
      el.style.border = '2px solid ' + binColD
      el.style.borderTopWidth = '3px'
      el.style.boxSizing = 'border-box'
      el.style.borderRadius = '2px'
      el.style.color = '#fff'
      el.style.fontFamily = "'Press Start 2P',monospace"
      el.style.fontSize = Math.round(6 * scale) + 'px'
      el.style.lineHeight = bh + 'px'
      el.style.textAlign = 'center'
      el.textContent = binLabel
      el.style.backgroundImage = 'linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0) 6px)'

      var isClose = false
      if (state.carrying && !state.stateLock) {
        var cdx = cxVal - (b.x + 8)
        if (Math.abs(cdx) < G.BIN_RANGE) isClose = true
      }
      if (isClose) {
        var label = "BUANG"
        var tw = measureTextWidth(label, 1)
        var ww = tw + 10
        var px2 = sx + 8 - ww / 2
        var py2 = b.y - 13
        rect(px2, py2, ww, 11, 'rgba(0,0,0,0.88)')
        rect(px2 + 1, py2 + 1, ww - 2, 1, 'rgba(255,255,255,0.08)')
        drawText(label, px2 + (ww - tw) / 2, py2 + 2, P.star, 1)
      }
    }
  }

  // ── draw particles ──
  function drawParticles() {
    for (var i = state.particles.length - 1; i >= 0; i--) {
      var p = state.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05
      p.life--

      if (p.isText) {
        var alpha = Math.min(1, p.life / p.maxLife * 2)
        cx.save()
        cx.globalAlpha = alpha
        var px = Math.floor(p.x - state.camX)
        drawText(p.col, px - measureTextWidth(p.col, 1) / 2, Math.floor(p.y), p.textColor || P.white, 1)
        cx.restore()
      } else {
        var alpha = p.life / p.maxLife
        rect(p.x - state.camX, p.y, p.size, p.size, p.col)
      }

      if (p.life <= 0) state.particles.splice(i, 1)
    }
  }

  // ── draw UI (BENAR! / SALAH! on overlay DOM) ──
  function drawUI() {
    if (state.flashTimer > 0) {
      var el = document.getElementById('game-flash-text')
      if (!el) return
      var alpha = Math.min(1, state.flashTimer / 20)
      el.style.opacity = alpha
      el.textContent = state.flashText
      el.style.color = state.flashColor
      el.style.borderColor = state.flashColor
      el.style.display = 'block'

      // draw text and border accent using canvas pixel font on the overlay canvas context
      // actually just use CSS-styled div: the overlay is above everything
      state.flashTimer--
      if (state.flashTimer <= 0) el.style.display = 'none'
    } else {
      var el = document.getElementById('game-flash-text')
      if (el) el.style.display = 'none'
    }
  }

  // ── spawn items ──
  function spawnItems(count) {
    var takenX = {}
    for (var i = 0; i < count; i++) {
      var tries = 0
      var x, ok
      do {
        x = rndInt(40, G.WORLD - 40)
        ok = true
        for (var b = 0; b < state.bins.length; b++) {
          if (Math.abs(x - state.bins[b].x) < 30) { ok = false; break }
        }
        if (takenX[x]) ok = false
        tries++
      } while (!ok && tries < 20)
      takenX[x] = true
      var data = pool[rndInt(0, pool.length - 1)]
      state.items.push({ x: x, y: G.GROUND - 24, icon: data.icon, cat: data.cat, label: data.label, data: data })
    }
  }

  // ── init ──
  function initGame() {
    state.bins = [
      { x: 150,  y: G.GROUND - 22, type: 'organik' },
      { x: 500,  y: G.GROUND - 22, type: 'anorganik' },
      { x: 850,  y: G.GROUND - 22, type: 'b3' },
    ]
    state.charX = G.WORLD / 2
    state.charY = G.GROUND - 28
    state.charDir = 1
    state.carrying = null
    state.score = 0
    state.highscore = parseInt(localStorage.getItem('kedis_highscore')) || 0
    state.items = []
    state.particles = []
    state.flashTimer = 0
    state.stateLock = false
    state.pickupAnimTimer = 0
    state.shakeTimer = 0
    state.shakeX = 0
    state.shakeY = 0
    spawnItems(4)
    G.isPlaying = true
    updateHUD()
    updateCertPanel()
  }

  // ── collision helpers (bird sprite center: charX+6, charY+19) ──
  function getCharCenterX() { return state.charX + 6 }

  function getCharCenterY() { return state.charY + 19 }

  // ── keyboard input listeners ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { state.keys.left = true; e.preventDefault() }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { state.keys.right = true; e.preventDefault() }
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault()
      if (!state.keys.space) {
        state.keys.space = true
        state.keys.spaceUsed = false
      }
    }
  })
  document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') state.keys.left = false
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') state.keys.right = false
    if (e.key === ' ' || e.key === 'Space') {
      state.keys.space = false
      state.keys.spaceUsed = false
    }
  })

  // ── mobile gamepad input listener ──
  function bindMobileControls() {
    var btnLeft = document.getElementById('pad-left')
    var btnRight = document.getElementById('pad-right')
    var btnAction = document.getElementById('pad-action')

    if (btnLeft) {
      ['touchstart', 'mousedown'].forEach(function(evt) {
        btnLeft.addEventListener(evt, function(e) {
          e.preventDefault()
          state.keys.left = true
        })
      });
      ['touchend', 'mouseup', 'mouseleave'].forEach(function(evt) {
        btnLeft.addEventListener(evt, function(e) {
          e.preventDefault()
          state.keys.left = false
        })
      })
    }

    if (btnRight) {
      ['touchstart', 'mousedown'].forEach(function(evt) {
        btnRight.addEventListener(evt, function(e) {
          e.preventDefault()
          state.keys.right = true
        })
      });
      ['touchend', 'mouseup', 'mouseleave'].forEach(function(evt) {
        btnRight.addEventListener(evt, function(e) {
          e.preventDefault()
          state.keys.right = false
        })
      })
    }

    if (btnAction) {
      ['touchstart', 'mousedown'].forEach(function(evt) {
        btnAction.addEventListener(evt, function(e) {
          e.preventDefault()
          if (!state.stateLock && state.pickupAnimTimer === 0) {
            if (!state.carrying) {
              tryPickup()
            } else {
              tryDeposit()
            }
          }
        })
      })
    }
  }

  // ── update ──
  function update(dt) {
    state.time = (state.time || 0) + dt

    if (state.stateLock) {
      state.stateTimer--
      if (state.stateTimer <= 0) state.stateLock = false
      return
    }

    var dx = 0
    state.moving = false
    if (state.keys.left) { dx = -G.SPEED; state.charDir = -1; state.moving = true }
    if (state.keys.right) { dx = G.SPEED; state.charDir = 1; state.moving = true }

    if (state.moving) {
      state.charX += dx * dt * 60
      state.charX = clamp(state.charX, 20, G.WORLD - 20)
      state.frameTimer += dt * 60
      if (state.frameTimer >= 6) {
        state.frameTimer = 0
        state.charFrame = (state.charFrame + 1) % 3
      }
    } else {
      state.frameTimer = 0
      state.charFrame = 0
    }

    // camera
    var targetCam = state.charX - G.CW / 2
    state.camX += (targetCam - state.camX) * dt * 5
    state.camX = clamp(state.camX, 0, G.WORLD - G.CW)

    // shake decay
    if (state.shakeTimer > 0) {
      state.shakeTimer--
      state.shakeX = (Math.random() - 0.5) * 4
      state.shakeY = (Math.random() - 0.5) * 4
    } else {
      state.shakeX = 0
      state.shakeY = 0
    }

    // pickup animation timer
    if (state.pickupAnimTimer > 0) {
      state.pickupAnimTimer--
    }

    // interaction
    if (state.keys.space && !state.keys.spaceUsed && state.pickupAnimTimer === 0) {
      state.keys.spaceUsed = true
      if (!state.carrying) {
        tryPickup()
      } else {
        tryDeposit()
      }
    }
  }

  function tryPickup() {
    var cxVal = getCharCenterX()
    var cyVal = getCharCenterY()
    for (var i = 0; i < state.items.length; i++) {
      var item = state.items[i]
      var d = dist(cxVal, cyVal, item.x + 12, item.y + 12)
      if (d < G.ITEM_RANGE * 1.2) {
        state.carrying = item.data
        state.items.splice(i, 1)
        state.pickupAnimTimer = 30
        return
      }
    }
  }

  function tryDeposit() {
    if (!state.carrying) return
    var cxVal = getCharCenterX()
    var cyVal = getCharCenterY()
    for (var i = 0; i < state.bins.length; i++) {
      var b = state.bins[i]
      var bx = b.x + 8
      var by = b.y + 11
      var d = dist(cxVal, cyVal, bx, by)
      if (d < G.BIN_RANGE) {
        var correct = state.carrying.cat === b.type
        if (correct) processCorrect(i)
        else processWrong(i)
        return
      }
    }
  }

  function processCorrect(binIdx) {
    state.stateLock = true
    state.stateTimer = 25
    state.score += 10
    if (state.score > state.highscore) {
      state.highscore = state.score
      localStorage.setItem('kedis_highscore', state.highscore)
    }
    state.flashText = 'BENAR!'
    state.flashTimer = 50
    state.flashColor = P.star
    state.carrying = null

    // particles (star burst)
    var b = state.bins[binIdx]
    for (var p = 0; p < 20; p++) {
      var angle = Math.random() * Math.PI * 2
      var speed = rnd(0.5, 2.5)
      state.particles.push({
        x: b.x + 8,
        y: b.y + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: rnd(1, 2.5),
        col: p % 3 === 0 ? P.star : p % 3 === 1 ? P.score : P.white,
        life: rndInt(18, 35),
        maxLife: 35,
      })
    }

    // floating score text
    state.particles.push({
      x: b.x + 8,
      y: b.y - 6,
      vx: 0,
      vy: -0.6,
      size: 0,
      col: '+10',
      life: 40,
      maxLife: 40,
      isText: true,
      textColor: P.star,
    })

    updateHUD()
    updateCertPanel()

    // spawn new item
    if (state.items.length < 3) {
      spawnItems(1)
    }

    setTimeout(function () {
      if (state.items.length < 3) spawnItems(1)
    }, 500)
  }

  function processWrong(binIdx) {
    state.stateLock = true
    state.stateTimer = 30
    state.score = Math.max(0, state.score - 5)
    state.flashText = 'SALAH!'
    state.flashTimer = 50
    state.flashColor = P.red
    state.shakeTimer = 18

    // floating penalty text
    state.particles.push({
      x: state.charX + 12,
      y: state.charY - 6,
      vx: 0,
      vy: -0.6,
      size: 0,
      col: '-5',
      life: 40,
      maxLife: 40,
      isText: true,
      textColor: P.red,
    })

    // red particles (explosion)
    var b = state.bins[binIdx]
    for (var p = 0; p < 14; p++) {
      var angle = Math.random() * Math.PI * 2
      var speed = rnd(0.8, 2.2)
      state.particles.push({
        x: b.x + 8,
        y: b.y + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: rnd(1, 2.5),
        col: p % 2 === 0 ? P.red : P.b3L,
        life: rndInt(12, 25),
        maxLife: 25,
      })
    }

    // drop item back to ground near player
    var dropX = clamp(state.charX + rnd(-20, 20), 20, G.WORLD - 20)
    state.items.push({
      x: dropX,
      y: G.GROUND - 24,
      icon: state.carrying.icon,
      cat: state.carrying.cat,
      label: state.carrying.label,
      data: state.carrying,
    })
    state.carrying = null
    updateHUD()
  }

  // ── HTML HUD ──
  function updateHUD() {
    var se = document.getElementById('game-score')
    var he = document.getElementById('game-highscore')
    if (se) se.textContent = state.score
    if (he) he.textContent = state.highscore
  }

  function updateCertPanel() {
    var panel = document.getElementById('game-cert-panel')
    if (!panel) return
    if (state.score >= 100) {
      panel.classList.remove('hidden')
    }
  }

  // ── game loop ──
  var lastTime = 0
  var frameCount = 0

  function gameLoop(time) {
    if (!G.isPlaying) return

    resizeGame()

    var dt = (time - lastTime) / 1000
    if (dt > 0.1) dt = 0.016
    lastTime = time

    update(dt)

    cx.clearRect(0, 0, G.CW, G.CH)
    if (cxBg) cxBg.clearRect(0, 0, G.CW, G.CH)

    cx.save()
    if (cxBg) cxBg.save()
    if (state.shakeTimer > 0) {
      cx.translate(state.shakeX, state.shakeY)
      if (cxBg) cxBg.translate(state.shakeX, state.shakeY)
    }

    // ── render (back→front) ──
    drawBG()
    drawSprites()
    drawParticles()
    drawUI()

    cx.restore()
    if (cxBg) cxBg.restore()

    frameCount++
    if (frameCount === 1) console.log('KEDIS game: first frame rendered')
    requestAnimationFrame(gameLoop)
  }

  // ── reset ──
  G.resetScore = function () {
    if (!confirm('Atur ulang skor ke 0?')) return
    state.score = 0
    updateHUD()
    var panel = document.getElementById('game-cert-panel')
    if (panel) panel.classList.add('hidden')
  }

  G.start = function () {
    if (!cv || !cx) { console.error('KEDIS: canvas not ready'); return }
    preloadImages(function() {
      resizeGame()
      window.addEventListener('resize', resizeGame)
      initSprites()
      initGame()
      bindMobileControls()
      G.isPlaying = true
      lastTime = performance.now()
      requestAnimationFrame(gameLoop)
    })
  }

  // ── export ──
  window.KEDIS_GAME = G
  window.KEDIS_GAME_RESET = G.resetScore
})()
