/* ======================= DOM ELEMENTS ======================= */
const id = ( id ) => document.getElementById( id );
const sections = document.querySelectorAll( '.animate' );


/* ========================== OBSERVERS ========================== */
// Observer to trigger slide-in animations when elements scroll into view
const observer = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        if ( entry.isIntersecting ) {
            entry.target.classList.add( 'active' );
        } else {
            entry.target.classList.remove( 'active' );
        }
    });
}, { threshold: 0.5, rootMargin: "0px 0px 0px 400px" });

sections.forEach( section => {
    observer.observe( section );
} );

/* ======================= DYNAMIC CONTENT ======================= */
// Set current year in footer
id( 'year' ).textContent = new Date().getFullYear();

/* ===================== FORM VALIDATION & HANDLING ===================== */
const commentForm = id( 'comment-form' );
const nameInput = id( 'name' );
const messageInput = id( 'message' );
const testimonialsList = id( 'testimonials-list' );

if ( commentForm ) {
    commentForm.addEventListener( 'submit', (e) => {
        e.preventDefault();

        // Perform basic validation
        let errors = [];
        if ( !nameInput.value.trim() ) {
            errors.push( 'Please enter a name.' );
            nameInput.parentElement.classList.add( 'incorrect' );
        }
        if ( !messageInput.value.trim() ) {
            errors.push( 'Please enter a message.' );
            messageInput.parentElement.classList.add( 'incorrect' );
        }

        if ( errors.length > 0 ) {
            // Display errors if any exist
            id( 'error-message' ).innerText = errors.join( ' ' );
        } else {
            // Success: clear errors
            id( 'error-message' ).innerText = '';

            // Construct new testimonial DOM elementdynamically
            const li = document.createElement( 'li' );
            li.classList.add( 'testimonial', 'animate', 'active' );

            const img = document.createElement( 'img' );
            img.setAttribute( 'src', '../assets/images/user.png' );
            img.setAttribute( 'alt', nameInput.value + ' Profile' );
            img.classList.add( 'avatar' );

            const div = document.createElement( 'div' );
            div.classList.add( 'user-info' );

            const h4 = document.createElement( 'h4' );
            h4.innerText = nameInput.value;

            const p = document.createElement( 'p' );
            p.innerText = `"${messageInput.value}"`;

            div.appendChild( h4 );
            div.appendChild( p );

            li.appendChild( img );
            li.appendChild( div );

            // Append new testimonial to the list
            testimonialsList.appendChild( li );

            // Reset form fields
            commentForm.reset();
        }
    });

    // Clear error highlights on input focus
    [nameInput, messageInput].forEach( input => {
        if ( input ) {
            input.addEventListener( 'input', () => {
                if ( input.parentElement.classList.contains( 'incorrect' ) ) {
                    input.parentElement.classList.remove( 'incorrect' );
                    id( 'error-message' ).innerText = '';
                }
            });
        }
    });
}
