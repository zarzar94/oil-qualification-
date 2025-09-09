// Open/Close Modal
        function openReviewModal() {
            document.getElementById('reviewModal').classList.add('show');
        }
        
        function closeReviewModal() {
            document.getElementById('reviewModal').classList.remove('show');
        }
        
        // Switch Tabs
        function switchTab(tabName) {
            // Remove active class from all tabs and sections
            document.querySelectorAll('.review-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.review-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to selected tab and section
            event.target.classList.add('active');
            document.getElementById(tabName + '-section').classList.add('active');
        }
        
        // Update score values when sliders change
        document.querySelectorAll('.score-slider').forEach(slider => {
            slider.addEventListener('input', function() {
                const scoreValue = this.parentElement.querySelector('.score-value');
                scoreValue.textContent = this.value;
                updateOverallScore();
            });
        });
        
        function updateOverallScore() {
            const scores = Array.from(document.querySelectorAll('.score-slider')).map(s => parseInt(s.value));
            const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            document.querySelector('.modal-footer span:last-of-type').textContent = `${average}/100`;
        }
        
        // Simple Chart Implementation (placeholder)
        // In production, you would use Chart.js or similar library
        function initCharts() {
            // This is a placeholder - implement with actual charting library
            console.log('Charts initialized');
        }
        
        // Initialize on load
        document.addEventListener('DOMContentLoaded', initCharts);