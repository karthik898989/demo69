/* ============================================
   3D AVATAR SYSTEM
   ============================================ */

class SimpleAvatar {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.animationFrame = 0;
        this.talking = false;
        this.emotion = 'neutral';
        this.blink = false;
        this.blinkTimer = 0;
        this.nextBlink = this._randomBlinkDelay();
        this.mouthAmp = 0; // 0..1
        this.pupilOffsetX = 0;
        this.pupilOffsetY = 0;
        
        this.draw();
    }

    setTalking(isTalking) {
        this.talking = isTalking;
    }

    setMouthAmplitude(v) {
        this.mouthAmp = Math.max(0, Math.min(1, v));
    }

    setEmotion(emotion) {
        this.emotion = emotion;
    }

    draw() {
        // Clear
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Soft background
        const bg = this.ctx.createLinearGradient(0, 0, 0, this.height);
        bg.addColorStop(0, 'rgba(102,126,234,0.06)');
        bg.addColorStop(1, 'rgba(240,147,251,0.03)');
        this.ctx.fillStyle = bg;
        this.ctx.fillRect(0, 0, this.width, this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2 - 40;

        // Head shading (radial)
        const headRadius = 72;
        const grd = this.ctx.createRadialGradient(centerX - 20, centerY - 20, headRadius * 0.2, centerX, centerY, headRadius);
        grd.addColorStop(0, '#ffd9b6');
        grd.addColorStop(1, '#f0a060');
        this.ctx.fillStyle = grd;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, headRadius, 0, Math.PI * 2);
        this.ctx.fill();

        // Neck / shoulders
        this.ctx.fillStyle = '#e6b087';
        this.ctx.fillRect(centerX - 22, centerY + headRadius - 10, 44, 26);

        // Torso
        this.ctx.fillStyle = '#667eea';
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 90, centerY + headRadius + 16);
        this.ctx.quadraticCurveTo(centerX, centerY + headRadius + 120, centerX + 90, centerY + headRadius + 16);
        this.ctx.closePath();
        this.ctx.fill();

        // Hair
        this.ctx.fillStyle = '#402b4a';
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY - 18, headRadius * 0.95, headRadius * 0.6, 0, Math.PI, 2 * Math.PI);
        this.ctx.fill();

        // Update blink timer
        this.blinkTimer++;
        if (this.blinkTimer > this.nextBlink) {
            this.blink = true;
            if (this.blinkTimer > this.nextBlink + 6) { // blink length ~6 frames
                this.blink = false;
                this.blinkTimer = 0;
                this.nextBlink = this._randomBlinkDelay();
            }
        }

        // Eye positions
        const eyeY = centerY - 18;
        const eyeLX = centerX - 26;
        const eyeRX = centerX + 26;
        this.drawEye(eyeLX, eyeY);
        this.drawEye(eyeRX, eyeY);

        // Mouth uses amplitude when talking
        const baseMouthOpen = this.talking ? (10 + this.mouthAmp * 22) : 6;
        this.drawMouth(centerX, centerY + 26, baseMouthOpen);

        // Eyebrows (emotion)
        this.drawEyebrows(centerX, centerY - 34, this.emotion);

        // Small emotion label
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#444';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.emotion.toUpperCase(), centerX, centerY + headRadius + 100);

        this.animationFrame++;
        requestAnimationFrame(() => this.draw());
    }

    drawEye(x, y) {
        const ctx = this.ctx;
        // sclera
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(x, y, 14, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // pupil offset wobble + user-driven small offset
        const wobble = Math.sin(this.animationFrame * 0.08) * (this.talking ? 2 : 0.6);
        const px = x + (this.pupilOffsetX * 6) + wobble;
        const py = y + (this.pupilOffsetY * 3);

        // blink: draw a line if blinking
        if (this.blink) {
            ctx.strokeStyle = '#402b4a';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 12, y);
            ctx.lineTo(x + 12, y);
            ctx.stroke();
            return;
        }

        // pupil
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        // small highlight
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(px - 2, py - 2, 1.6, 0, Math.PI * 2);
        ctx.fill();
    }

    drawMouth(centerX, y, openAmount) {
        const ctx = this.ctx;
        ctx.fillStyle = '#5a2e2e';
        ctx.beginPath();
        ctx.ellipse(centerX, y, 22, openAmount, 0, 0, Math.PI * 2);
        ctx.fill();

        // inner mouth (darker)
        ctx.fillStyle = '#341515';
        ctx.beginPath();
        ctx.ellipse(centerX, y + Math.max(3, openAmount * 0.3), 14, Math.max(4, openAmount - 6), 0, 0, Math.PI * 2);
        ctx.fill();
    }

    drawEyebrows(centerX, y, emotion) {
        const ctx = this.ctx;
        ctx.strokeStyle = '#402b4a';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        let offset = 0;
        if (emotion === 'happy') offset = -4;
        if (emotion === 'nervous') offset = 6;
        if (emotion === 'thinking') offset = -2;
        if (emotion === 'confident') offset = -6;

        // left eyebrow
        ctx.beginPath();
        ctx.moveTo(centerX - 34, y + offset);
        ctx.quadraticCurveTo(centerX - 20, y + offset - 4, centerX - 6, y + offset);
        ctx.stroke();

        // right eyebrow
        ctx.beginPath();
        ctx.moveTo(centerX + 34, y + offset);
        ctx.quadraticCurveTo(centerX + 20, y + offset - 4, centerX + 6, y + offset);
        ctx.stroke();
    }

    drawEmotion(centerX, centerY) {
        // Deprecated: emotion is now shown near avatar in draw(); kept for backward compatibility
    }

    _randomBlinkDelay() {
        return 80 + Math.floor(Math.random() * 160); // frames (roughly 1-4 seconds depending on FPS)
    }
}

// Initialize avatar
let avatar;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('avatar-canvas')) {
        avatar = new SimpleAvatar('avatar-canvas');
    }
});
