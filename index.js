
// Script pour gérer l'ouverture/fermeture du menu hamburger
    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const closeMenu = document.querySelector('.close-menu');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        
        // Ouvrir le menu
        hamburgerMenu.addEventListener('click', function() {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
        });
        
        // Fermer le menu
        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Rétablir le défilement
        }
        
        closeMenu.addEventListener('click', closeMobileMenu);
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
        
        // Fermer le menu en cliquant sur un lien
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Animation pour les boutons commander
        const commanderButtons = document.querySelectorAll('.commander-button');

        commanderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const originalText = button.textContent;
                button.textContent = 'Ajouté !';
                button.style.backgroundColor = '#f0ad4e';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '#000';
                }, 1500);
            });
        });
    });

    // Exemple de JavaScript (à mettre dans script.js)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.produit-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Logique pour naviguer vers la page produit correspondante
            const category = card.classList[1]; // Récupère 'femmes', 'bijoux', etc.
            console.log(`Naviguer vers la catégorie : ${category}`);
            // window.location.href = `/categorie/${category}.html`; // Décommenter pour la navigation réelle
        });
    });
});

 document.addEventListener('DOMContentLoaded', () => {
        
        const quickViewModal = document.getElementById('quick-view-modal');
        const closeModalBtn = document.querySelector('.close-modal-btn');
        const zoomIcons = document.querySelectorAll('.zoom-icon');
        const modalCommandBtn = document.querySelector('.modal-command-btn');

        // Fonction pour remplir et afficher la modale
        const showQuickViewModal = (productCard) => {
            const productName = productCard.querySelector('.name').textContent;
            const productPrice = productCard.querySelector('.price').textContent.split(' ')[0]; // Prendre seulement le prix sans la devise
            const productBrand = productCard.querySelector('.brand').textContent;
            
            // Simuler l'URL de l'image (pour voir quelque chose de différent du placeholder par défaut)
            const productImageSrc = productCard.querySelector('img').src.replace('Produit', productName.replace(/ /g, '+')); 

            // Récupérer les éléments de la modale
            document.getElementById('modal-product-image').src = productImageSrc;
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-product-price').textContent = productPrice;
            document.getElementById('modal-product-category').textContent = productBrand;
            document.querySelector('.modal-command-btn').setAttribute('data-product-name', productName);

            // Ouvrir la modale
            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Empêche le défilement du corps
        };

        // Fonction pour masquer la modale
        const hideQuickViewModal = () => {
            quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Rétablit le défilement
        };


        // Événement : Clic sur l'icône de Zoom
        zoomIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation(); 
                const productCard = icon.closest('.product-card');
                showQuickViewModal(productCard);
            });
        });
        
        // Événement : Clic sur le bouton de fermeture ou l'overlay
        closeModalBtn.addEventListener('click', hideQuickViewModal);
        quickViewModal.addEventListener('click', (event) => {
            if (event.target === quickViewModal) {
                hideQuickViewModal();
            }
        });

        // ----------------------------------------------------
        // LOGIQUE DES BOUTONS DE COMMANDE (Grille + Modale)
        // ----------------------------------------------------

        // 1. Rendre les boutons "COMMANDER" de la grille fonctionnels
        const commandButtonsGrid = document.querySelectorAll('.command-button');
        commandButtonsGrid.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); 
                const productName = button.getAttribute('data-product-name');
                alert(`✅ Le produit "${productName}" (depuis la grille) a été ajouté au panier !`);
            });
        });

        // 2. Rendre le bouton "COMMANDER" de la MODALE fonctionnel
        modalCommandBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            const productName = modalCommandBtn.getAttribute('data-product-name');
            const quantity = document.getElementById('qty-input').value;
            hideQuickViewModal(); // Fermer la modale après la commande
            alert(`✅ ${quantity} x "${productName}" (depuis la modale) ont été ajoutés au panier !`);
        });

        // 3. Logique de quantité dans la modale
        const qtyInput = document.getElementById('qty-input');
        document.getElementById('qty-minus').addEventListener('click', () => {
            let currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
            }
        });
        document.getElementById('qty-plus').addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });

        // 4. Rendre les icônes d'action (survol) fonctionnelles (comme avant)
        const actionIcons = document.querySelectorAll('.action-icon');
        actionIcons.forEach(icon => {
            // ... (Votre logique d'icône d'action précédente, en excluant 'zoom' car géré ci-dessus)
            if(icon.getAttribute('data-action') !== 'zoom') {
                icon.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation(); 
                    
                    const action = icon.getAttribute('data-action');
                    const productCard = icon.closest('.product-card');
                    const productName = productCard.querySelector('.name').textContent;
                    
                    let message = '';
                    if(action === 'compare') {
                        message = `🔎 Ajout de "${productName}" à la liste de comparaison.`;
                    } else if (action === 'wishlist') {
                        icon.classList.toggle('active-wishlist');
                        if (icon.classList.contains('active-wishlist')) {
                            icon.querySelector('i').classList.replace('fa-regular', 'fa-solid'); 
                            message = `❤️ "${productName}" a été ajouté à votre liste de souhaits.`;
                        } else {
                            icon.querySelector('i').classList.replace('fa-solid', 'fa-regular');
                            message = `💔 "${productName}" a été retiré de votre liste de souhaits.`;
                        }
                    } 
                    
                    alert(message);
                });
            }
        });

    });

            document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Rendre les boutons "COMMANDER" fonctionnels
            const commandButtons = document.querySelectorAll('.command-button');
            commandButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    
                    const productName = button.getAttribute('data-product-name');
                    
                    // Alerte simple pour simuler l'ajout au panier
                    alert(`✅ Le produit "${productName}" a été ajouté au panier ! (Cette action déclencherait une redirection ou l'ouverture d'un formulaire de commande dans une vraie application.)`);
                });
            });

            // 2. Rendre les icônes d'action (survol) fonctionnelles
            const actionIcons = document.querySelectorAll('.action-icon');
            actionIcons.forEach(icon => {
                icon.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation(); // Empêche l'événement de se propager à la carte entière
                    
                    const action = icon.getAttribute('data-action');
                    const productCard = icon.closest('.product-card');
                    const productName = productCard.querySelector('.name').textContent;
                    
                    let message = '';

                    switch(action) {
                        case 'wishlist':
                            // Simuler l'ajout ou la suppression de la liste de souhaits
                            icon.classList.toggle('active-wishlist');
                            if (icon.classList.contains('active-wishlist')) {
                                icon.querySelector('i').classList.replace('fa-regular', 'fa-solid'); // Remplir le cœur
                                message = `❤️ "${productName}" a été ajouté à votre liste de souhaits.`;
                            } else {
                                icon.querySelector('i').classList.replace('fa-solid', 'fa-regular'); // Vider le cœur
                                message = `💔 "${productName}" a été retiré de votre liste de souhaits.`;
                            }
                            break;
                        default:
                            message = 'Action non reconnue.';
                    }
                    
                    alert(message);
                });
            });

        })