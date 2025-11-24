export default {
	  backend: {
      name: 'cms', 
      api_root: '/sveltia-server', 
      backend_name: 'github', 
    },
    media: {
        directory: 'public/img',
        publicPath: '/img'
    },

    collections: [
        // --- 1. HOME PAGE (Single File: content/index.md) ---
        {
            name: "home",
            label: "Home",
            preview: true,
            files: [
                {
                    file: "content/index.md",
                    label: "Homepage Content",
                    name: "homepage",
                    fields: [
                        { label: "Layout", name: "layout", widget: "hidden", default: "home.njk" },
                        { label: "Title", name: "title", widget: "string" },
                        { label: "Description", name: "description", widget: "text" },
                        { label: "Image", name: "image", widget: "image" },
                        { label: "Hero Text", name: "text", widget: "text", hint: "The main text under the hero image." },
                        {
                            label: "Hero Button", name: "button", widget: "object",
                            fields: [
                                { label: "Text", name: "text", widget: "string" },
                                { label: "URL", name: "url", widget: "string" }
                            ]
                        },
                        {
                            label: "Featured Section", name: "section", widget: "object",
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                {
                                    label: "List Items", name: "list", widget: "list",
                                    fields: [
                                        { label: "Title", name: "title", widget: "string" },
                                        { label: "Icon (Font Awesome)", name: "icon", widget: "string", hint: "e.g., fab fa-facebook" },
                                        { label: "Text", name: "text", widget: "text" }
                                    ]
                                }
                            ]
                        },
                        {
                            label: "Blog Section", name: "blog", widget: "object",
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                {
                                    label: "Button", name: "button", widget: "object",
                                    fields: [
                                        { label: "Text", name: "text", widget: "string" },
                                        { label: "URL", name: "url", widget: "string" }
                                    ]
                                }
                            ]
                        },
                        { label: "Body Content", name: "body", widget: "markdown" }
                    ]
                }
            ]
        },

        // --- 2. AUTHORS LIST DATA (Single File: _data/authors.yaml) ---
        {
            name: "authors_list",
            label: "Authors List Data",
            preview: false,
            files: [
                {
                    file: "_data/authors.yaml",
                    label: "Authors List",
                    name: "authors_list_data",
                    widget: "list",
                    fields: [
                        { label: "Key (Slug)", name: "key", widget: "string", hint: "Use lower case, example: john_dhoe" },
                        { label: "Name", name: "name", widget: "string" },
                        { label: "Biography", name: "bio", widget: "text" },
                        { label: "Image URL", name: "image", widget: "image" }
                    ]
                }
            ]
        },

        // --- 3. BLOG INDEX PAGE (Single File: content/blog.md) ---
        {
            name: "blogIndex",
            label: "Blog Index",
            preview: true,
            files: [
                {
                    file: "content/blog.md",
                    label: "Blog Listing Page",
                    name: "blog_index",
                    fields: [
                        { label: "Layout", name: "layout", widget: "hidden", default: "blog.njk" },
                        { label: "Title", name: "title", widget: "string" },
                        { label: "Description", name: "description", widget: "text" },
                        // Pagination Settings (dibuat visible untuk editing data, tapi collapsed)
                        { 
                            label: "Pagination Settings", name: "pagination", widget: "object", collapsed: true,
                            fields: [
                                { label: "Data Source", name: "data", widget: "hidden", default: "collections.posts" },
                                { label: "Page Size", name: "size", widget: "number", value_type: "int", default: 6 },
                                { label: "Reverse Order", name: "reverse", widget: "boolean", default: true }
                            ]
                        },
                        // Test Data (dibuat visible tapi collapsed)
                        {
                            label: "Test Data (Example)", name: "testdata", widget: "list", collapsed: true,
                            fields: [
                                { label: "Item", name: "item", widget: "string" }
                            ]
                        },
                        { label: "Permalink", name: "permalink", widget: "hidden", default: "/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html" },
                        { label: "Body Content (Optional)", name: "body", widget: "markdown", required: false }
                    ]
                }
            ]
        },

        // --- 4. BLOG POSTS (Dynamic: content/blog/*.md) ---
        {
            name: "posts",
            label: "Blog Posts",
            folder: "content/blog",
            create: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Description", name: "description", widget: "text", hint: "A short summary of the post." },
                { label: "Publish Date", name: "date", widget: "datetime" },
                { label: "Tags", name: "tags", widget: "list", field: { label: "Tag", name: "tag", widget: "string" } },
                {
                    label: "Author", name: "author", widget: "relation",
                    collection: "authors_list", // Mengacu pada nama koleksi list penulis
                    search_fields: ["fields.*.name"],
                    value_field: "fields.*.key",
                    display_fields: ["fields.*.name"]
                },
                { label: "Body", name: "body", widget: "markdown" }
            ]
        },

        // --- 5. AUTHOR LIST PAGE (Single File: content/authors.md) ---
        {
            name: "authorList",
            label: "Author List Page",
            preview: true,
            files: [
                {
                    file: "content/authors.md",
                    label: "Authors Listing Page",
                    name: "authors_list_page",
                    fields: [
                        { label: "Layout", name: "layout", widget: "hidden", default: "author-list.njk" },
                        { label: "Title", name: "title", widget: "string" },
                        { label: "Description", name: "description", widget: "text" },
                        { label: "Body Content (Optional)", name: "body", widget: "markdown", required: false }
                    ]
                }
            ]
        },
        
        // --- 6. AUTHOR PROFILES (Dynamic: content/authors/*.md) ---
        {
            name: "authors_profile",
            label: "Author Profiles",
            folder: "content/authors",
            create: true,
            slug: "{{title | slug}}",
            fields: [
                { label: "Title", name: "title", widget: "string", hint: "Full name of the author." },
                { label: "Description", name: "description", widget: "string", hint: "Short description for meta tags." },
                { label: "Publish Date", name: "date", widget: "datetime" },
                { label: "Profile Image", name: "image", widget: "image" },
                {
                    label: "Social Links", name: "social", widget: "list", collapsed: true,
                    fields: [
                        { label: "Title", name: "title", widget: "string" },
                        { label: "Icon (Font Awesome)", name: "icon", widget: "string", hint: "e.g., fa-solid fa-envelope" },
                        { label: "URL", name: "url", widget: "string" }
                    ]
                },
                {
                    label: "Call-to-Action Button", name: "button", widget: "object",
                    fields: [
                        { label: "Title", name: "title", widget: "string" },
                        { label: "URL", name: "url", widget: "string" }
                    ]
                },
                { label: "Biography", name: "body", widget: "markdown", hint: "The main content/bio of the author." }
            ]
        },

        // --- 7. GENERAL PAGES (Dynamic: content/pages/*.md) ---
        {
            name: "pages",
            label: "Static Pages",
            folder: "content/pages",
            create: true,
            slug: "{{slug}}",
            fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Description", name: "description", widget: "text" },
                { label: "Permalink", name: "permalink", widget: "string", hint: "Example: /about/" },
                { label: "Body", name: "body", widget: "markdown" }
            ]
        },

        // --- 8. ARCHIVES (Dynamic: content/archives/*.md) ---
        {
            name: "archives",
            label: "Archives",
            folder: "content/archives",
            create: true,
            slug: "{{title | slug}}",
            fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Description", name: "description", widget: "text" },
                { label: "Body", name: "body", widget: "markdown", required: false }
            ]
        },

        // --- 9. METADATA (Single File: _data/metadata.yaml) ---
        {
            name: "metadata",
            label: "Site Settings",
            preview: false,
            files: [
                {
                    file: "_data/metadata.yaml",
                    label: "Site Metadata",
                    name: "site_metadata",
                    fields: [
                        { label: "Title", name: "title", widget: "string" },
                        { label: "Description", name: "description", widget: "text" },
                        { label: "Image", name: "image", widget: "image" },
                        { label: "Language", name: "language", widget: "string" },
                        { label: "Locale", name: "locale", widget: "string" },
                        { label: "Favicon", name: "favicon", widget: "image" },
                        { label: "URL", name: "url", widget: "string" },
                        {
                            label: "Metasocial", name: "metasocial", widget: "list",
                            fields: [
                                { label: "Facebook", name: "facebook", widget: "string", required: false },
                                { label: "Twitter User", name: "twitteruser", widget: "string", required: false },
                                { label: "Twitter", name: "twitter", widget: "string", required: false }
                            ]
                        },
                        {
                            label: "Navbar", name: "navbar", widget: "object",
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                { label: "Sub Title", name: "sub_title", widget: "string" },
                                {
                                    label: "Social Links", name: "social", widget: "list",
                                    fields: [
                                        { label: "Title", name: "title", widget: "string" },
                                        { label: "Icon (Font Awesome)", name: "icon", widget: "string" },
                                        { label: "URL", name: "url", widget: "string" }
                                    ]
                                }
                            ]
                        },
                        {
                            label: "Sidebar", name: "sidebar", widget: "object",
                            fields: [
                                {
                                    label: "Menu", name: "menu", widget: "object",
                                    fields: [
                                        { label: "Title", name: "title", widget: "string" },
                                        {
                                            label: "List Menu", name: "list", widget: "list",
                                            fields: [
                                                { label: "Nav Text", name: "nav", widget: "string" },
                                                { label: "URL", name: "url", widget: "string" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: "Info Section", name: "info", widget: "object",
                                    fields: [
                                        { label: "Title", name: "title", widget: "string" },
                                        {
                                            label: "List Items", name: "list", widget: "list",
                                            fields: [
                                                { label: "Image", name: "image", widget: "image" },
                                                { label: "Text", name: "text", widget: "text" },
                                                { label: "URL", name: "url", widget: "string" }
                                            ]
                                        },
                                        {
                                            label: "Button", name: "button", widget: "object",
                                            fields: [
                                                { label: "Text", name: "text", widget: "string" },
                                                { label: "URL", name: "url", widget: "string" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: "Contact", name: "contact", widget: "object",
                                    fields: [
                                        { label: "Title", name: "title", widget: "string" },
                                        { label: "Text", name: "text", widget: "text" },
                                        {
                                            label: "Contact List", name: "list", widget: "list",
                                            fields: [
                                                { label: "Title", name: "title", widget: "string" },
                                                { label: "Icon (Font Awesome)", name: "icon", widget: "string" },
                                                { label: "URL", name: "url", widget: "string" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: "Footer", name: "footer", widget: "object",
                            fields: [
                                { label: "Text", name: "text", widget: "string" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};