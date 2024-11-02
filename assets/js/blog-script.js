document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    // Function to filter blog posts
    const filterBlogPosts = (filter) => {
        blogPosts.forEach(post => {
            if (filter === 'all' || post.dataset.category === filter) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    };

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Apply filter
            filterBlogPosts(filter);
        });
    });

    // Initialize with 'all' filter
    filterBlogPosts('all');
});
