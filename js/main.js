/* ======================= DOM ELEMENTS ======================= */
const btn = document.querySelector( '.neo-btn' );

/* ======================= HOVER EFFECTS ======================= */
// Track mouse movement to create the directional glow effect on the button
btn.addEventListener( 'mousemove', (e) => {
	const coordinates = btn.getBoundingClientRect();
	btn.style.setProperty('--x', `${e.clientX - coordinates.left}px`);
	btn.style.setProperty('--y', `${e.clientY - coordinates.top}px`);
});

/* ======================= NAVIGATION ROUTING ======================= */
// Redirect to home page on click, but only for the landing page 'jump-in' button
if ( btn && btn.id === 'jump-in-btn' ) {
	btn.addEventListener( 'click', () => {
		window.location.href = './html/home.html';
	});
}