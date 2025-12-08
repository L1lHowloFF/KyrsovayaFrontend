// Reviews page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Stars rating functionality
    const stars = document.querySelectorAll('.rating-stars-input .star');
    const ratingInput = document.getElementById('reviewRating');
    
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                ratingInput.value = value;
                
                // Update stars display
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const value = parseInt(this.getAttribute('data-value'));
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentValue = parseInt(ratingInput.value);
                stars.forEach((s, index) => {
                    if (index < currentValue) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
        
        // Initialize with 5 stars
        stars.forEach((star, index) => {
            if (index < 5) {
                star.classList.add('active');
            }
        });
    }
    
    // Load more reviews functionality
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    const reviewsGrid = document.querySelector('.reviews-grid');
    
    if (loadMoreBtn && reviewsGrid) {
        // Additional reviews data
        const moreReviews = [
            {
                initials: "AM",
                name: "Anna M.",
                date: "December 20, 2023",
                rating: "★★★★★",
                title: "Perfect Holiday Gift",
                text: "The Holiday Collection was the perfect gift for my colleagues. Everyone loved the unique flavors!",
                flavor: "Holiday Collection"
            },
            {
                initials: "TJ",
                name: "Thomas J.",
                date: "November 5, 2023",
                rating: "★★★★★",
                title: "Addicted to Pint Club",
                text: "The Pint Club is the best decision I've made all year. Every month brings new delicious surprises!",
                flavor: "Pint Club"
            },
            {
                initials: "SG",
                name: "Samantha G.",
                date: "October 15, 2023",
                rating: "★★★★☆",
                title: "Great Customer Service",
                text: "Had a small issue with my delivery, but customer service resolved it immediately. Great experience!",
                flavor: "Chocolate Fudge Brownie"
            },
            {
                initials: "DR",
                name: "David R.",
                date: "September 8, 2023",
                rating: "★★★★★",
                title: "Perfect for Special Diets",
                text: "As someone with dietary restrictions, I appreciate the clear labeling and quality ingredients.",
                flavor: "Multiple Flavors"
            }
        ];
        
        loadMoreBtn.addEventListener('click', function() {
            // Add more reviews
            moreReviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">${review.initials}</div>
                            <div class="reviewer-details">
                                <div class="reviewer-name">${review.name}</div>
                                <div class="review-date">${review.date}</div>
                            </div>
                        </div>
                        <div class="review-rating">${review.rating}</div>
                    </div>
                    <div class="review-title">${review.title}</div>
                    <div class="review-text">${review.text}</div>
                    <div class="review-flavor">
                        <span class="flavor-tag">${review.flavor}</span>
                    </div>
                `;
                reviewsGrid.appendChild(reviewCard);
            });
            
            // Hide the button after loading
            loadMoreBtn.style.display = 'none';
            
            // Show message
            const message = document.createElement('p');
            message.textContent = 'All reviews loaded!';
            message.style.textAlign = 'center';
            message.style.color = 'var(--text-secondary)';
            message.style.marginTop = '20px';
            loadMoreBtn.parentNode.appendChild(message);
        });
    }
    
    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewerName').value;
            const email = document.getElementById('reviewerEmail').value;
            const rating = document.getElementById('reviewRating').value;
            const flavor = document.getElementById('reviewFlavor').value;
            const title = document.getElementById('reviewTitle').value;
            const text = document.getElementById('reviewText').value;
            
            // Simple validation
            if (!name || !email || !title || !text) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'review-success';
            successMessage.innerHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
                    <strong>Thank you for your review!</strong><br>
                    Your feedback has been submitted successfully.
                </div>
            `;
            
            // Insert after form
            reviewForm.parentNode.insertBefore(successMessage, reviewForm.nextSibling);
            
            // Reset form
            reviewForm.reset();
            
            // Reset stars
            if (stars.length > 0) {
                stars.forEach((star, index) => {
                    if (index < 5) {
                        star.classList.add('active');
                    } else {
                        star.classList.remove('active');
                    }
                });
                ratingInput.value = 5;
            }
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});