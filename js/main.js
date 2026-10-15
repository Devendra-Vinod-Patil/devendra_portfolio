/* ============================================================
   DEVENDRA VINOD PATIL — PORTFOLIO JAVASCRIPT
   ============================================================
   TABLE OF CONTENTS:
   1. MOBILE NAVIGATION MENU TOGGLE
   2. INTERSECTION OBSERVER (SCROLL REVEAL ANIMATIONS)
   3. HERO SECTION ENTRANCE ANIMATIONS
   4. RESUME BUTTON CLICK HANDLERS
   5. CONTACT FORM SUBMISSION (MAILTO HANDLER)
   6. STICKY HEADER SHADOW ON SCROLL
============================================================ */

(function () {
    "use strict";

    /* ============================================================
       1. MOBILE NAVIGATION MENU TOGGLE
       ============================================================
       Handles opening, closing, trap focus, keyboard esc key, and aria attribute updates.
    */
    var burger = document.getElementById('burger');
    var mobileMenu = document.getElementById('mobileMenu');
    var mmClose = document.getElementById('mmClose');

    function openMenu() {
        if (!mobileMenu || !burger || !mmClose) return;
        mobileMenu.classList.add('open');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        mmClose.focus();
    }

    function closeMenu() {
        if (!mobileMenu || !burger) return;
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
    }

    if (burger && mobileMenu && mmClose) {
        burger.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
        });

        mmClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeMenu();
        });

        // Close mobile menu when clicking outside links (on backdrop area)
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });

        // Close mobile menu on clicking any navigation link
        document.querySelectorAll('.mobile-menu a').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });

        // Close menu on ESC key press
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    /* ============================================================
       2. INTERSECTION OBSERVER (SCROLL REVEAL ANIMATIONS)
       ============================================================
       Applies '.in-view' class to elements with '.reveal' or '.section-head' when scrolled into viewport.
    */
    var revealEls = document.querySelectorAll('.reveal, .section-head');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        // Fallback for older browsers without IntersectionObserver
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }

    /* ============================================================
       3. HERO SECTION ENTRANCE ANIMATIONS
       ============================================================
       Triggers initial load sequence for hero heading & stat cards.
    */
    window.addEventListener('DOMContentLoaded', function () {
        var heroCopy = document.querySelector('.hero-copy');
        var heroStrip = document.querySelector('.hero-strip');
        setTimeout(function () { if (heroCopy) heroCopy.classList.add('in-view'); }, 150);
        setTimeout(function () { if (heroStrip) heroStrip.classList.add('in-view'); }, 420);
    });

    /* ============================================================
       4. RESUME BUTTON CLICK HANDLERS
       ============================================================
       Smoothly scrolls to the contact section when resume buttons are clicked.
       Modify here if direct download file (e.g. PDF link) is added.
    */
    ['resumeBtnHero', 'resumeBtnFooter'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                var contactSec = document.getElementById('contact');
                if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    /* ============================================================
       5. CONTACT FORM SUBMISSION (GMAIL & LOCAL MAIL DISPATCH)
       ============================================================
       Opens Gmail compose in browser with recipient, subject, and formatted body.
       Works locally and online without needing backend servers or external APIs.
       Provides seamless fallback to default local mail clients and clickable backup links.
    */
    var form = document.getElementById('contactForm');
    var note = document.getElementById('formNote');
    if (form && note) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameEl = document.getElementById('cf-name');
            var emailEl = document.getElementById('cf-email');
            var subjectEl = document.getElementById('cf-subject');
            var messageEl = document.getElementById('cf-message');
            var submitBtn = form.querySelector('button[type="submit"]');

            var name = nameEl ? nameEl.value.trim() : '';
            var email = emailEl ? emailEl.value.trim() : '';
            var userSubject = (subjectEl && subjectEl.value.trim()) ? subjectEl.value.trim() : '';
            var message = messageEl ? messageEl.value.trim() : '';

            if (!name || !email || !message) {
                note.style.color = '#B91C1C';
                note.innerHTML = '<strong>Please fill in your name, email, and message.</strong>';
                return;
            }

            var recipient = 'patildevendra984@gmail.com';
            var fullSubject = userSubject ? (userSubject + ' - ' + name) : ('Portfolio Contact from ' + name);

            var bodyText = 'Hi Devendra,\n\n'
                + 'I would like to get in touch with you:\n\n'
                + '--------------------------------------------------\n'
                + 'Sender Name: ' + name + '\n'
                + 'Sender Email: ' + email + '\n'
                + 'Subject: ' + (userSubject || 'Portfolio Inquiry') + '\n'
                + '--------------------------------------------------\n\n'
                + 'Message:\n'
                + message + '\n\n'
                + 'Best regards,\n'
                + name;

            // Direct Gmail Web Compose link
            var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
                + '&to=' + encodeURIComponent(recipient)
                + '&su=' + encodeURIComponent(fullSubject)
                + '&body=' + encodeURIComponent(bodyText);

            // Local mailto URI (triggers Windows Mail, Apple Mail, Outlook, default client)
            var mailtoUrl = 'mailto:' + encodeURIComponent(recipient)
                + '?subject=' + encodeURIComponent(fullSubject)
                + '&body=' + encodeURIComponent(bodyText);

            // Button status feedback
            var origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message &rarr;';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Opening Gmail...';
            }

            // Attempt opening Gmail directly in a new tab
            var openedTab = null;
            try {
                openedTab = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
            } catch (err) {
                openedTab = null;
            }

            // If popup blocker intervened, trigger local mailto
            var popupBlocked = (!openedTab || openedTab.closed || typeof openedTab.closed === 'undefined');
            if (popupBlocked) {
                setTimeout(function () {
                    window.location.href = mailtoUrl;
                }, 350);
            }

            // Display rich status message with quick recovery links
            note.style.color = '#15803D';
            note.innerHTML = '<div style="margin-top:10px; line-height:1.5;">'
                + '<strong>&#10003; Opening Gmail to send your message to ' + recipient + '...</strong><br>'
                + '<span style="font-size:0.86rem; color:var(--ink-soft);">'
                + 'Didn’t open? '
                + '<a href="' + gmailUrl + '" target="_blank" rel="noopener noreferrer" style="color:var(--pink-deep); text-decoration:underline; font-weight:700;">Open in Gmail &nearr;</a> or '
                + '<a href="' + mailtoUrl + '" style="color:var(--ink); text-decoration:underline; font-weight:700;">Open in Default Mail Client &rarr;</a>'
                + '</span>'
                + '</div>';

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = origBtnHtml;
                }
            }, 2000);
        });
    }

    /* ============================================================
       6. STICKY HEADER SHADOW ON SCROLL
       ============================================================
       Adds subtle drop shadow to fixed header bar when page is scrolled down.
    */
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            var y = window.scrollY;
            if (y > 12) {
                header.style.boxShadow = '0 4px 0 rgba(17,17,17,0.08)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    /* ============================================================
       7. CERTIFICATE & IMAGE LIGHTBOX MODAL
       ============================================================
       Intercepts certificate & gallery clicks to show them in a native <dialog>
    */
    var certModal = document.getElementById('certModal');
    var certModalImg = document.getElementById('certModalImg');
    var certModalTitle = document.getElementById('certModalTitle');
    var certModalCaption = document.getElementById('certModalCaption');

    function openLightbox(src, alt, title, caption) {
        if (!certModal || !certModalImg) return;
        certModalImg.src = src;
        certModalImg.alt = alt || 'Preview';
        if (certModalTitle) certModalTitle.textContent = title || 'Document Viewer';
        if (certModalCaption) certModalCaption.textContent = caption || '';
        certModal.showModal();
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('.cert-link, .gallery-card, [data-lightbox]');
        if (!trigger) return;

        // If clicking a link inside a gallery card that goes to another page, let it navigate
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && !e.target.classList.contains('cert-link')) {
            return;
        }

        var src = trigger.getAttribute('data-img') || trigger.getAttribute('href');
        if (src && src !== '#') {
            e.preventDefault();
            var title = trigger.getAttribute('data-title') || trigger.querySelector('.gallery-card-title, .cert-name')?.textContent || 'Document Preview';
            var caption = trigger.getAttribute('data-caption') || trigger.querySelector('.gallery-card-caption, .cert-org')?.textContent || '';
            var alt = trigger.getAttribute('data-alt') || title;
            openLightbox(src, alt, title, caption);
        }
    });

    if (certModal) {
        // Close modal when clicking outside the modal box (on backdrop) or close button
        certModal.addEventListener('click', function (e) {
            var rect = certModal.getBoundingClientRect();
            var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
                && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog || e.target.closest('#certModalClose')) {
                certModal.close();
            }
        });
    }

    /* ============================================================
       8. MOVING PHOTO GALLERY & CAROUSEL ENGINE
       ============================================================
       Auto-sliding, pause on hover, drag/swipe, prev/next controls,
       and reduced-motion compliance.
    */
    var trackWrap = document.getElementById('galleryTrackWrap');
    var prevBtn = document.getElementById('galleryPrevBtn');
    var nextBtn = document.getElementById('galleryNextBtn');

    if (trackWrap) {
        var isDown = false;
        var startX, scrollLeft;
        var autoSlideTimer = null;
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Scroll step calculation
        var getScrollStep = function () {
            var firstCard = trackWrap.querySelector('.gallery-card');
            return firstCard ? (firstCard.offsetWidth + 22) : 340;
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                trackWrap.scrollBy({ left: -getScrollStep(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                var maxScroll = trackWrap.scrollWidth - trackWrap.clientWidth;
                if (trackWrap.scrollLeft >= maxScroll - 10) {
                    trackWrap.scrollTo({ left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                } else {
                    trackWrap.scrollBy({ left: getScrollStep(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        }

        // Auto-play loop unless reduced motion is preferred
        function startAutoSlide() {
            if (prefersReducedMotion || autoSlideTimer) return;
            autoSlideTimer = setInterval(function () {
                var maxScroll = trackWrap.scrollWidth - trackWrap.clientWidth;
                if (trackWrap.scrollLeft >= maxScroll - 10) {
                    trackWrap.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    trackWrap.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
                }
            }, 3500);
        }

        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        }

        startAutoSlide();

        trackWrap.addEventListener('mouseenter', stopAutoSlide);
        trackWrap.addEventListener('mouseleave', startAutoSlide);
        trackWrap.addEventListener('focusin', stopAutoSlide);
        trackWrap.addEventListener('focusout', startAutoSlide);

        // Mouse Drag to Scroll
        trackWrap.addEventListener('mousedown', function (e) {
            isDown = true;
            stopAutoSlide();
            startX = e.pageX - trackWrap.offsetLeft;
            scrollLeft = trackWrap.scrollLeft;
        });

        trackWrap.addEventListener('mouseleave', function () {
            isDown = false;
        });

        trackWrap.addEventListener('mouseup', function () {
            isDown = false;
        });

        trackWrap.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - trackWrap.offsetLeft;
            var walk = (x - startX) * 1.5;
            trackWrap.scrollLeft = scrollLeft - walk;
        });

        // Touch Swipe
        trackWrap.addEventListener('touchstart', function () {
            stopAutoSlide();
        }, { passive: true });

        trackWrap.addEventListener('touchend', function () {
            startAutoSlide();
        }, { passive: true });
    }

    /* ============================================================
       9. GALLERY CATEGORY FILTER (IF PRESENT)
       ============================================================
    */
    var galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                galleryFilterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-gallery-filter');
                var cards = document.querySelectorAll('.gallery-card');
                cards.forEach(function (card) {
                    var category = card.getAttribute('data-category') || '';
                    if (filter === 'all' || category.indexOf(filter) !== -1) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

})();
