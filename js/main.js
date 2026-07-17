$(document).ready(function () {
  // Main Header Scroll Transition & Spacing Shrink
  const $header = $('#main-header');
  if ($header.length) {
    const handleScroll = () => {
      if ($(window).scrollTop() > 10) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    };
    $(window).on('scroll', handleScroll);
    handleScroll(); // Trigger once on load
  }

  // Mobile Menu Toggle
  const $mobileMenuButton = $('#mobile-menu-button');
  const $mobileMenu = $('#mobile-menu');

  if ($mobileMenuButton.length && $mobileMenu.length) {
    $mobileMenuButton.on('click', function (e) {
      e.stopPropagation();
      $mobileMenu.slideToggle(250);
      const expanded = $mobileMenuButton.attr('aria-expanded') === 'true';
      $mobileMenuButton.attr('aria-expanded', !expanded);
      if ($header.length) {
        $header.toggleClass('mobile-open', !expanded);
      }
    });

    // Close menu when clicking outside
    $(document).on('click', function (e) {
      if (!$(e.target).closest('#mobile-menu, #mobile-menu-button').length) {
        $mobileMenu.slideUp(200);
        $mobileMenuButton.attr('aria-expanded', 'false');
        if ($header.length) {
          $header.removeClass('mobile-open');
        }
      }
    });
  }

  // Desktop Nav Eco-Learn Dropdown Click Toggle
  const $dropdownTrigger = $('#desktop-dropdown-trigger');
  const $dropdownMenu = $('#desktop-dropdown-menu');
  
  if ($dropdownTrigger.length && $dropdownMenu.length) {
    const $chevron = $dropdownTrigger.find('i');
    $dropdownTrigger.on('click', function(e) {
      e.stopPropagation();
      $dropdownMenu.toggleClass('hidden');
      $chevron.toggleClass('rotate-180');
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('#desktop-dropdown-trigger, #desktop-dropdown-menu').length) {
        $dropdownMenu.addClass('hidden');
        $chevron.removeClass('rotate-180');
      }
    });
  }

  // Donut Chart — SVG segments with hover tooltip
  var donutChart = document.getElementById('donut-chart');
  if (donutChart) {
    var donutData = [
      { label: 'Terkompos', pct: 65, color: '#97d700' }, // Warm Leaf Green
      { label: 'Daur Ulang', pct: 15, color: '#f25c54' }, // Premium Soft Coral/Red
      { label: 'Diproses Khusus', pct: 12, color: '#52b788' }, // Eucalyptus Mint Teal
      { label: 'Ke Residu TPA', pct: 8, color: '#a5a58d' } // Soft Charcoal Stone/Taupe
    ];
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = donutChart.querySelector('.donut-svg');
    var cx = 60, cy = 60, outerR = 50, innerR = 33;
    var startAngle = 0;
    var tooltip = document.getElementById('donut-tooltip');
    var tipLabel = document.getElementById('tooltip-label');
    var tipPct = document.getElementById('tooltip-pct');
    var segments = [];

    donutData.forEach(function (d) {
      var endAngle = startAngle + (d.pct / 100) * 360;
      var sr = (startAngle * Math.PI) / 180;
      var er = (endAngle * Math.PI) / 180;
      var x1 = cx + outerR * Math.sin(sr);
      var y1 = cy - outerR * Math.cos(sr);
      var x2 = cx + outerR * Math.sin(er);
      var y2 = cy - outerR * Math.cos(er);
      var x3 = cx + innerR * Math.sin(er);
      var y3 = cy - innerR * Math.cos(er);
      var x4 = cx + innerR * Math.sin(sr);
      var y4 = cy - innerR * Math.cos(sr);
      var large = d.pct > 50 ? 1 : 0;
      var pathD = 'M ' + x1 + ',' + y1 +
                  ' A ' + outerR + ',' + outerR + ' 0 ' + large + ',1 ' + x2 + ',' + y2 +
                  ' L ' + x3 + ',' + y3 +
                  ' A ' + innerR + ',' + innerR + ' 0 ' + large + ',0 ' + x4 + ',' + y4 + ' Z';

      var seg = document.createElementNS(svgNS, 'path');
      seg.setAttribute('class', 'donut-segment');
      seg.setAttribute('d', pathD);
      seg.setAttribute('fill', d.color);
      seg.setAttribute('stroke', '#ffffff');
      seg.setAttribute('stroke-width', '2');
      seg.setAttribute('stroke-linejoin', 'round');

      seg.addEventListener('mouseenter', function () {
        segments.forEach(function (s) {
          if (s !== seg) s.setAttribute('class', 'donut-segment dimmed');
        });
        tipLabel.textContent = d.label + ' ';
        tipPct.textContent = d.pct + '%';
        tooltip.classList.remove('hidden');
      });
      seg.addEventListener('mouseleave', function () {
        segments.forEach(function (s) {
          s.setAttribute('class', 'donut-segment');
        });
        tooltip.classList.add('hidden');
      });

      svg.appendChild(seg);
      segments.push(seg);
      startAngle = endAngle;
    });
  }

  // Eco-Diagnosis Wizard
  var $diagOptions = $('.diag-opt-btn');
  var $diagResult = $('#diagnosis-result');
  var $diagIcon = $('#diag-icon-target');
  var $diagTitle = $('#diag-title-target');
  var $diagDesc = $('#diag-desc-target');
  var $diagLink = $('#diag-link-target');
  var $diagBadge = $('#diag-badge-certificate');

  if ($diagOptions.length && $diagResult.length) {
    var diagData = {
      '1': {
        icon: '<i class="fa-solid fa-book-open"></i>',
        title: 'Pelajari Panduan Klasifikasi di Eco-Learn',
        desc: 'Kami menyarankan Anda membaca panduan klasifikasi digital kami. Eco-Learn menyediakan tabel pemilah sampah interaktif untuk membedakan sampah Organik (sisa masakan), Anorganik (plastik, kertas, kaleng), serta limbah Berbahaya/B3 (baterai, elektronik) lengkap dengan tips pengomposan rumahan.',
        link: 'edukasi.html',
        btnText: 'Buka Panduan Eco-Learn',
        showBadge: false,
        imgSrc: 'assets/element/TongSampahMerahKuningHijau.svg'
      },
      '2': {
        icon: '<i class="fa-solid fa-calculator"></i>',
        title: 'Hitung Emisi Karbon dengan Eco-Monitor',
        desc: 'Evaluasi dampak gas rumah kaca dari sampah dapur Anda secara mandiri. Gunakan kalkulator Eco-Monitor di bawah untuk menghitung emisi metana tahunan setara pohon. Anda juga bisa mencetak Sertifikat Aksi Hijau secara langsung setelah hasil analisis muncul!',
        link: '#eco-monitor',
        btnText: 'Hitung Jejak Emisi Sekarang',
        showBadge: true,
        imgSrc: 'assets/element/TongSampahHijau.svg'
      },
      '3': {
        icon: '<i class="fa-solid fa-people-group"></i>',
        title: 'Temukan Komunitas Hijau di Eco-Connect',
        desc: 'Jangan berjalan sendirian! Eco-Connect menyediakan basis data jejaring bank sampah regional dan komunitas peduli lingkungan terdekat di kota Anda. Salurkan hasil pemilahan Anda dan tukarkan dengan tabungan digital atau ikuti aksi sukarela.',
        link: 'komunitas.html',
        btnText: 'Cari Komunitas Terdekat',
        showBadge: false,
        imgSrc: 'assets/element/BuangSampahPadaTempatnya.svg'
      },
      '4': {
        icon: '<i class="fa-solid fa-gamepad"></i>',
        title: 'Simulasi Pemilahan Menyenangkan di Eco-Play',
        desc: 'Latih ketangkasan dan refleks pemilahan Anda melalui game arcade 2D interaktif kami. Jalankan pemilah, ambil sampah, dan sortir ke tong yang tepat secepat mungkin. Selesaikan simulasi dengan skor minimal 100 poin untuk mengklaim Sertifikat Kelulusan Aksi Hijau!',
        link: 'game.html',
        btnText: 'Mainkan Eco-Play',
        showBadge: true,
        imgSrc: 'assets/element/TongIsiSampah.svg'
      }
    };

    $diagOptions.on('click', function () {
      var optId = $(this).attr('data-opt');
      var data = diagData[optId];

      if (data) {
        // Reset states
        $diagOptions.attr('aria-checked', 'false').removeClass('border-inkBlack ring-2 ring-limeCanopy/30 bg-limeCanopy/5');
        $diagOptions.find('.diag-num-indicator').removeClass('bg-limeCanopy text-inkBlack').addClass('bg-paperWhite text-inkBlack');
        
        // Activate current
        $(this).attr('aria-checked', 'true').addClass('border-inkBlack ring-2 ring-limeCanopy/30 bg-limeCanopy/5');
        $(this).find('.diag-num-indicator').addClass('bg-paperWhite text-inkBlack').removeClass('bg-warmMist text-inkBlack');

        // Set content
        $diagIcon.html(data.icon);
        $diagTitle.text(data.title);
        $diagDesc.html(data.desc);
        $diagLink.attr('href', data.link).html(data.btnText + ' <i class="fa-solid fa-arrow-right ml-1.5"></i>');
        $('#diag-ill-target').attr('src', data.imgSrc);
        
        if (data.showBadge) {
          $diagBadge.removeClass('hidden');
        } else {
          $diagBadge.addClass('hidden');
        }

        // Show result panel
        $diagResult.removeClass('hidden');
        
        // Smooth scroll to results
        $('html, body').animate({
          scrollTop: $diagResult.offset().top - 120
        }, 400);
      }
    });
  }

  // Intersection Observer for scroll animations (respect reduced motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('fade-in-up').css('opacity', 1);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });

    $('.animate-on-scroll').each(function () {
      $(this).css('opacity', 0);
      observer.observe(this);
    });
  } else {
    $('.animate-on-scroll').css('opacity', 1);
  }

  // Scroll-triggered counter animation for crisis section
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const $el = $(entry.target);
          const target = parseInt($el.attr('data-counter'), 10);
          if (!target || target === 0) { counterObserver.unobserve(entry.target); return; }
          const duration = 1200;
          const startTime = performance.now();
          const startVal = 0;
          function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (target - startVal) * eased);
            $el.text(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              $el.text(target);
            }
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    $('[data-counter]').each(function () {
      counterObserver.observe(this);
    });
  }

  // Hero Search Recommendations & Interactivity
  const $searchInput = $('#hero-search-input');
  const $suggestionsBox = $('#search-suggestions');
  const $searchForm = $('#hero-search-form');

  if ($searchInput.length && $suggestionsBox.length) {
    const suggestionsData = [
      // ── Organik ──
      { title: "Kulit Buah & Sayur", category: "Organik", tab: "organik", icon: "fa-apple-whole" },
      { title: "Sisa Sayuran & Makanan", category: "Organik", tab: "organik", icon: "fa-seedling" },
      { title: "Ampas Kopi & Teh", category: "Organik", tab: "organik", icon: "fa-mug-hot" },
      { title: "Cangkang Telur", category: "Organik", tab: "organik", icon: "fa-egg" },
      { title: "Daun Kering & Ranting", category: "Organik", tab: "organik", icon: "fa-leaf" },
      { title: "Kardus & Karton Bekas", category: "Anorganik", tab: "anorganik", icon: "fa-box-open" },
      { title: "Kompos & Pupuk Organik", category: "Organik", tab: "organik", icon: "fa-tree" },
      { title: "Eco-Enzyme dari Sisa Dapur", category: "Organik", tab: "organik", icon: "fa-vial" },
      { title: "Takakura: Kompos Keranjang", category: "Organik", tab: "organik", icon: "fa-basket-shopping" },
      { title: "Biopori & Resapan Air", category: "Organik", tab: "organik", icon: "fa-water" },

      // ── Anorganik ──
      { title: "Botol Plastik PET & HDPE", category: "Anorganik", tab: "anorganik", icon: "fa-bottle-water" },
      { title: "Kertas & Koran Bekas", category: "Anorganik", tab: "anorganik", icon: "fa-newspaper" },
      { title: "Kaleng Aluminium & Baja", category: "Anorganik", tab: "anorganik", icon: "fa-can-food" },
      { title: "Botol & Gelas Kaca", category: "Anorganik", tab: "anorganik", icon: "fa-glass-water" },
      { title: "Detergen & Sampo Plastik", category: "Anorganik", tab: "anorganik", icon: "fa-soap" },
      { title: "Kemasan Makanan & Minuman", category: "Anorganik", tab: "anorganik", icon: "fa-box" },
      { title: "Kode Daur Ulang 1-7 (RIC)", category: "Anorganik", tab: "anorganik", icon: "fa-recycle" },
      { title: "Cuci Kering Simpan (CKS)", category: "Anorganik", tab: "anorganik", icon: "fa-hand-sparkles" },
      { title: "Plastik LDPE & PP", category: "Anorganik", tab: "anorganik", icon: "fa-bag-shopping" },
      { title: "Styrofoam & PS", category: "Anorganik", tab: "anorganik", icon: "fa-cube" },

      // ── B3 ──
      { title: "Baterai Bekas & Aki", category: "B3", tab: "b3", icon: "fa-battery-quarter" },
      { title: "Lampu Neon & CFL Rusak", category: "B3", tab: "b3", icon: "fa-lightbulb" },
      { title: "Obat Kedaluwarsa", category: "B3", tab: "b3", icon: "fa-prescription-bottle-medical" },
      { title: "Aerosol & Kaleng Semprot", category: "B3", tab: "b3", icon: "fa-spray-can" },
      { title: "Oli Mesin Bekas", category: "B3", tab: "b3", icon: "fa-oil-can" },
      { title: "Termometer & Air Raksa", category: "B3", tab: "b3", icon: "fa-temperature-half" },
      { title: "Pembersih & Pemutih Kimia", category: "B3", tab: "b3", icon: "fa-jug-detergent" },
      { title: "Cat & Thinner Sisa", category: "B3", tab: "b3", icon: "fa-paint-brush" },
      { title: "Pestisida & Insektisida", category: "B3", tab: "b3", icon: "fa-bug" },
      { title: "Limbah Medis Rumah Tangga", category: "B3", tab: "b3", icon: "fa-syringe" },
      { title: "Minyak Jelantah Bekas", category: "B3", tab: "b3", icon: "fa-fire" },
      { title: "Ponsel & Gadget Rusak", category: "B3", tab: "b3", icon: "fa-mobile-screen-button" },

      // ── Kelas Edukasi: Kreasi & Daur Ulang ──
      { title: "Olahan Plastik Menjadi Kreasi", category: "Kelas Edukasi", url: "artikel.html?id=olahan-plastik", icon: "fa-recycle" },
      { title: "Pemilahan Kulit Buah & Eco-Enzym", category: "Kelas Edukasi", url: "artikel.html?id=kulit-buah", icon: "fa-apple-whole" },
      { title: "Daur Ulang Kertas Seni Estetik", category: "Kelas Edukasi", url: "artikel.html?id=daur-ulang-kertas", icon: "fa-newspaper" },
      { title: "Penanganan Limbah B3 Elektronik", category: "Kelas Edukasi", url: "artikel.html?id=limbah-b3", icon: "fa-triangle-exclamation" },
      { title: "Organisasi Meja dari Kaleng Bekas", category: "Kelas Edukasi", url: "artikel.html?id=kaleng-bekas", icon: "fa-can-food" },
      { title: "Kompos Dapur Metode Takakura", category: "Kelas Edukasi", url: "artikel.html?id=kompos-takakura", icon: "fa-seedling" },
      { title: "Upcycling Baju Bekas Jadi Tas", category: "Kelas Edukasi", url: "artikel.html?id=baju-bekas", icon: "fa-tshirt" },
      { title: "Penyaluran & Daur Ulang Jelantah", category: "Kelas Edukasi", url: "artikel.html?id=minyak-jelantah", icon: "fa-oil-can" },
      { title: "Lilin Aromaterapi Minyak Jelantah", category: "Kelas Edukasi", url: "artikel.html?id=lilin-jelantah", icon: "fa-fire" },

      // ── General / Mixed Keywords ──
      { title: "Cara Memilah Sampah Harian", category: "Panduan", tab: "organik", icon: "fa-hand-fist" },
      { title: "Daftar Tempat Dropbox Sampah", category: "Komunitas", url: "komunitas.html", icon: "fa-location-dot" },
      { title: "Simulasi Game Pilah Sampah", category: "Game", url: "game.html", icon: "fa-gamepad" },
      { title: "Komunitas Hijau Terdekat", category: "Komunitas", url: "komunitas.html", icon: "fa-people-group" },
    ];


    const renderSuggestions = (query) => {
      $suggestionsBox.empty();
      const qClean = query.trim().toLowerCase();
      
      let filtered = [];
      if (qClean === "") {
        // Show 6 random suggestions each time
        const shuffled = [...suggestionsData].sort(() => Math.random() - 0.5);
        filtered = shuffled.slice(0, 6);
        $suggestionsBox.append('<div class="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-stoneGray/50 border-b border-ashBorder/5">Topik Populer</div>');
      } else {
        const words = qClean.split(/\s+/).filter(w => w.length > 0);
        filtered = suggestionsData.filter(item => {
          const title = item.title.toLowerCase();
          const cat = item.category.toLowerCase();
          // Match if any word is in title or category
          return words.some(w => title.includes(w) || cat.includes(w));
        });
        $suggestionsBox.append('<div class="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-stoneGray/50 border-b border-ashBorder/5">Hasil Rekomendasi</div>');
      }

      if (filtered.length === 0) {
        $suggestionsBox.append(
          `<div class="px-6 py-4 text-sm text-stoneGray italic">` +
            `<span>Tidak menemukan hasil untuk "${query}"</span>` +
          `</div>`
        );
        return;
      }

      filtered.forEach(item => {
        let titleHtml = item.title;
        if (qClean !== "") {
          const index = item.title.toLowerCase().indexOf(qClean);
          if (index >= 0) {
            const start = item.title.slice(0, index);
            const match = item.title.slice(index, index + qClean.length);
            const end = item.title.slice(index + qClean.length);
            titleHtml = `${start}<strong class="text-inkBlack font-bold underline decoration-limeCanopy decoration-2">${match}</strong>${end}`;
          }
        }

        const $btn = $(
          `<button type="button" class="suggestion-item w-full px-6 py-2.5 text-left hover:bg-warmMist transition-colors text-sm text-stoneGray hover:text-inkBlack font-medium border-b border-ashBorder/5 last:border-0">` +
            `<span>${titleHtml}</span>` +
          `</button>`
        );

        $btn.on('click', function () {
          $searchInput.val(item.title);
          $suggestionsBox.addClass('hidden');
          if (item.url) {
            window.location.href = item.url;
          } else {
            $searchForm.find('input[name="tab"]').remove();
            $searchForm.append(`<input type="hidden" name="tab" value="${item.tab}">`);
            $searchForm.submit();
          }
        });

        $suggestionsBox.append($btn);
      });
    };

    $searchInput.on('focus', function () {
      renderSuggestions($(this).val());
      $suggestionsBox.removeClass('hidden');
    });

    $searchInput.on('input', function () {
      renderSuggestions($(this).val());
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('#hero-search-form').length) {
        $suggestionsBox.addClass('hidden');
      }
    });
    $searchForm.on('submit', function (e) {
      if ($searchInput.val().trim() === "") {
        e.preventDefault();
      }
    });
  }
  // Eco-Monitor: Carbon Calculator Logic (Ported from kalkulator.html)
  var $calcBtn = $('#btn-calculate');
  var $calcInputs = $('#weight-organic, #weight-plastic, #weight-paper');
  
  if ($calcBtn.length && $calcInputs.length) {
    $calcInputs.on('input', function() {
      if (parseFloat($(this).val()) < 0) $(this).val('');
    });
    
    $calcBtn.on('click', function() {
      var orgInput = $('#weight-organic').val();
      var plaInput = $('#weight-plastic').val();
      var papInput = $('#weight-paper').val();
      
      var isEmpty = (orgInput === '' && plaInput === '' && papInput === '');
      
      var org = Math.max(0, parseFloat(orgInput) || 0);
      var pla = Math.max(0, parseFloat(plaInput) || 0);
      var pap = Math.max(0, parseFloat(papInput) || 0);
      
      $calcBtn.prop('disabled', true).find('i').removeClass('fa-calculator').addClass('fa-spinner fa-spin');
      
      setTimeout(function() {
        var yearlyCo2 = (org * 0.8 * 52) + (pla * 1.5 * 52) + (pap * 1.0 * 52);
        var treesEquiv = Math.round(yearlyCo2 / 22);
        
        // Animate CO2 count
        $({ countVal: 0 }).animate({ countVal: yearlyCo2 }, {
          duration: 1000,
          easing: 'swing',
          step: function() {
            $('#co2-produced').text(this.countVal.toFixed(1) + ' Kg CO\u2082');
          },
          complete: function() {
            $('#co2-produced').text(yearlyCo2.toFixed(1) + ' Kg CO\u2082').addClass('counter-reveal');
          }
        });
        
        // Animate Trees saved count
        $({ countVal: 0 }).animate({ countVal: treesEquiv }, {
          duration: 1000,
          easing: 'swing',
          step: function() {
            $('#trees-saved').text(Math.round(this.countVal) + ' Pohon');
          },
          complete: function() {
            $('#trees-saved').text(treesEquiv + ' Pohon').addClass('counter-reveal');
          }
        });

        var rec = '';
        if (isEmpty) {
          rec = 'Masukkan perkiraan berat sampah dapur, plastik, atau kertas Anda pada kolom input di atas untuk mulai memantau kontribusi karbon.';
        } else if (yearlyCo2 === 0) {
          rec = 'Luar biasa! Jejak emisi sampah Anda bernilai nol. Mari terus pertahankan pola konsumsi minim kemasan ini secara konsisten.';
        } else if (org >= pla && org >= pap) {
          rec = 'Sampah organik mendominasi limbah Anda. Mulailah mengolahnya secara mandiri menggunakan komposter dapur sederhana atau biopori halaman rumah untuk menghasilkan kompos bergizi tinggi bagi tanaman.';
        } else if (pla >= org && pla >= pap) {
          rec = 'Sampah plastik sekali pakai mendominasi limbah Anda. Hindari kantong kresek sekali pakai saat belanja, cuci botol PET bekas Anda, lalu salurkan secara berkala ke Bank Sampah terdekat untuk didaur ulang.';
        } else {
          rec = 'Sampah kertas/kardus mendominasi limbah Anda. Kelompokkan koran lama dan kotak karton kiriman belanjaan Anda, ikat dengan tali secara rapi, lalu salurkan ke bank sampah atau pengepul daur ulang terdekat.';
        }
        $('#recommendation-text').text(rec);
        $('#result-panel').slideDown(300);
        $calcBtn.prop('disabled', false).find('i').removeClass('fa-spinner fa-spin').addClass('fa-calculator');
      }, 350);
    });

    // Certificate printing
    // Certificate printing modal triggers
    $('#btn-print-cert').on('click', function() {
      $('#cert-user-name').val('');
      $('#cert-modal').removeClass('hidden').addClass('flex').hide().fadeIn(200);
      $('#cert-modal-content').removeClass('scale-95').addClass('scale-100');
    });

    function closeCertModal() {
      $('#cert-modal-content').removeClass('scale-100').addClass('scale-95');
      $('#cert-modal').fadeOut(200, function() {
        $(this).removeClass('flex').addClass('hidden');
      });
    }

    $('#btn-close-cert-modal, #btn-cancel-cert, #cert-modal').on('click', function(e) {
      if (e.target === this) {
        closeCertModal();
      }
    });

    $('#btn-close-cert-modal, #btn-cancel-cert').on('click', function() {
      closeCertModal();
    });

    $('#cert-modal-content').on('click', function(e) {
      e.stopPropagation();
    });

    $('#btn-submit-cert').on('click', function() {
      var name = $('#cert-user-name').val().trim();
      if (!name) {
        alert('Mohon masukkan nama lengkap Anda.');
        return;
      }
      closeCertModal();

      var co2 = $('#co2-produced').text() + ' / tahun';
      var trees = $('#trees-saved').text() + ' / tahun';
      var date = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

      var printWindow = window.open('', '_blank', 'width=900,height=650');
      var certHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Sertifikat Aksi Hijau KEDIS - ${name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 landscape; margin: 0; }
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #ffffff; color: #333333; display: flex; justify-content: center; align-items: center; height: 100vh; box-sizing: border-box; }
    .cert-border { width: 297mm; height: 210mm; padding: 20mm; box-sizing: border-box; background-color: #ffffff; border: 15px solid #122817; position: relative; display: flex; flex-direction: column; justify-content: space-between; text-align: center; }
    .cert-inner-border { border: 2px solid #bebeb9; height: 100%; padding: 10mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; }
    .logo-section { margin-top: 5px; }
    .logo-text { font-family: 'Space Grotesk', sans-serif; size: 24px; font-weight: 700; color: #122817; letter-spacing: 2px; }
    .cert-title { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; color: #333333; margin: 15px 0 5px 0; text-transform: uppercase; letter-spacing: 1px; }
    .cert-subtitle { font-size: 14px; color: #6c6c6c; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; }
    .recipient-intro { font-size: 16px; color: #6c6c6c; margin-top: 25px; }
    .recipient-name { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; color: #122817; border-bottom: 2px solid #d7eb80; display: inline-block; padding-bottom: 5px; margin: 10px 0; }
    .cert-desc { font-size: 15px; line-height: 1.6; color: #333333; max-width: 700px; margin: 15px auto; }
    .highlight { font-weight: 700; color: #122817; background-color: rgba(215, 235, 128, 0.2); padding: 0 4px; }
    .footer-section { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; padding: 0 40px; }
    .signature { width: 150px; text-align: center; }
    .sig-line { border-top: 1px solid #bebeb9; margin-top: 50px; padding-top: 5px; font-size: 12px; font-weight: 600; color: #333333; }
    .sig-title { font-size: 10px; color: #6c6c6c; margin-top: 2px; }
    .date-info { font-size: 12px; color: #6c6c6c; font-weight: 600; text-align: left; }
  </style>
</head>
<body>
  <div class="cert-border">
    <div class="cert-inner-border">
      <div class="logo-section"><div class="logo-text">KEDIS</div></div>
      <div>
        <div class="cert-title">Sertifikat Aksi Hijau</div>
        <div class="cert-subtitle">Eco-Citizen Award</div>
      </div>
      <div>
        <div class="recipient-intro">Diberikan kepada:</div>
        <div class="recipient-name">${name}</div>
      </div>
      <div>
        <p class="cert-desc">
          Atas partisipasi aktif dalam melakukan pemilahan sampah mandiri dari rumah serta berkontribusi langsung dalam menekan emisi gas rumah kaca tahunan sebesar <span class="highlight">${co2}</span> atau setara dengan penyerapan gas emisi karbon oleh <span class="highlight">${trees}</span> secara berkelanjutan.
        </p>
      </div>
      <div class="footer-section">
        <div class="date-info">Diterbitkan pada:<br><span style="color: #333333;">${date}</span></div>
        <div class="signature">
          <span style="font-family: 'Space Grotesk', sans-serif; font-style: italic; font-weight: 700; color: #122817; font-size: 14px;">KEDIS Digital</span>
          <div class="sig-line">Sistem Kampanye KEDIS</div>
          <div class="sig-title">Smart Digital Solution</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>
      `;
      printWindow.document.write(certHtml);
      printWindow.document.close();
    });
  }

  // Typewriter effect for Hero Dynamic Text
  var $dynamicEl = $('#hero-dynamic-text');
  if ($dynamicEl.length) {
    var texts = [
      "Hijaukan Bumi Kita.",
      "Kurangi Jejak Karbonmu.",
      "Selamatkan Air Tanah Kita."
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $dynamicEl.text(texts[0]);
    } else {
      var textIndex = 0;
      var charIndex = texts[0].length;
      var isDeleting = false;
      var typingSpeed = 100;
      var deletingSpeed = 50;
      var delayBetweenTexts = 2000;

      function type() {
        var currentText = texts[textIndex];
        if (isDeleting) {
          $dynamicEl.text(currentText.substring(0, charIndex - 1));
          charIndex--;
        } else {
          $dynamicEl.text(currentText.substring(0, charIndex + 1));
          charIndex++;
        }

        var nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          nextSpeed = delayBetweenTexts;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          nextSpeed = 500;
        }

        setTimeout(type, nextSpeed);
      }

      setTimeout(type, 1000);
    }
  }
});
