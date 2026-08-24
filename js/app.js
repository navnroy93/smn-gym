/**
 * SMN GYM Website Interactive Engine
 * Features: Mobile Nav Toggle, Smooth Scrolling, Lightbox Modal, Interactive BMI Calculator, WhatsApp Appointment Booking
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set default date to tomorrow for appointment booking
    const aptDateInput = document.getElementById('apt-date');
    if (aptDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        aptDateInput.value = tomorrow.toISOString().split('T')[0];
        aptDateInput.min = new Date().toISOString().split('T')[0];
    }

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // 2. Active Link Highlight on Scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 3. WhatsApp Appointment Booking Form Handler
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('apt-name').value.trim();
            const phone = document.getElementById('apt-phone').value.trim();
            const date = document.getElementById('apt-date').value;
            const time = document.getElementById('apt-time').value;
            const goal = document.getElementById('apt-goal').value;

            if (!name || !phone || !date) {
                alert('Please fill in your name, phone number, and preferred date.');
                return;
            }

            const formattedMessage = `Hi SMN Gym! I would like to book a Gym Tour & Trial Appointment.%0A%0A` +
                `*Name:* ${encodeURIComponent(name)}%0A` +
                `*Phone:* ${encodeURIComponent(phone)}%0A` +
                `*Date:* ${encodeURIComponent(date)}%0A` +
                `*Time Slot:* ${encodeURIComponent(time)}%0A` +
                `*Fitness Goal:* ${encodeURIComponent(goal)}`;

            const whatsappUrl = `https://wa.me/?text=${formattedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 4. BMI Calculator Logic
    const bmiForm = document.getElementById('bmi-form');
    const bmiResultBox = document.getElementById('bmi-result');
    const bmiScore = document.getElementById('bmi-score');
    const bmiStatus = document.getElementById('bmi-status');
    const bmiAdvice = document.getElementById('bmi-advice');

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const heightCm = parseFloat(document.getElementById('height-input').value);
            const weightKg = parseFloat(document.getElementById('weight-input').value);

            if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
                alert('Please enter valid height and weight values.');
                return;
            }

            const heightMeters = heightCm / 100;
            const bmi = (weightKg / (heightMeters * heightMeters)).toFixed(1);

            bmiScore.innerText = bmi;
            bmiResultBox.style.display = 'block';

            if (bmi < 18.5) {
                bmiStatus.innerText = 'Underweight (Build Muscle Phase)';
                bmiStatus.style.color = '#0284c7';
                bmiAdvice.innerText = 'Your BMI indicates underweight. Join SMN GYM to follow our High-Protein Hypertrophy Weight Gain Workout Program!';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                bmiStatus.innerText = 'Normal Weight (Optimal Fitness)';
                bmiStatus.style.color = '#059669';
                bmiAdvice.innerText = 'Awesome shape! Enhance your strength, endurance, and muscle definition with SMN GYM’s progressive training routines.';
            } else if (bmi >= 25.0 && bmi <= 29.9) {
                bmiStatus.innerText = 'Overweight (Fat Burn Phase)';
                bmiStatus.style.color = '#d97706';
                bmiAdvice.innerText = 'Your BMI indicates overweight. SMN GYM’s Cardio Bay & High-Intensity Resistance Training will help shed fat quickly!';
            } else {
                bmiStatus.innerText = 'Obese (Transformation Needed)';
                bmiStatus.style.color = '#dc2626';
                bmiAdvice.innerText = 'Let’s start your transformation! Our certified trainers will design a safe, highly effective cardio and calorie-deficit plan.';
            }
        });
    }
});

// 5. Lightbox Photo Viewer
function openLightbox(imageSrc, captionText) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (modal && img && caption) {
        img.src = imageSrc;
        caption.innerText = captionText;
        modal.classList.add('active');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}
