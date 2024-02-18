$(function() {
  
    var posts,
        isFetchingPosts = false,
        shouldFetchPosts = true;
  
    var postsToLoad = $(".tag-master:not(.hidden) .post-list").children().length, loadNewPostsThreshold = 10;

    $.getJSON('/all-posts.json', function(data) {
      posts = data["posts"];
      // If there aren't any more posts available to load than already visible, disable fetching
      if (posts.length <= postsToLoad)
        disableFetching();
    });
  
  
    // If there's no spinner, it's not a page where posts should be fetched    
    if ($(".infinite-spinner").length < 1)
      shouldFetchPosts = false;
  
    // Are we close to the end of the page? If we are, load more posts
    $(window).scroll(function(e){
      if (!shouldFetchPosts || isFetchingPosts) return;
  
      var windowHeight = $(window).height(),
          windowScrollPosition = $(window).scrollTop(),
          bottomScrollPosition = windowHeight + windowScrollPosition,
          documentHeight = $(document).height();
  
      // If we've scrolled past the loadNewPostsThreshold, fetch posts
      if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
        fetchPosts();
      }
    });
  
    // Fetch a chunk of posts
    function fetchPosts() {
      // Exit if posts haven't been loaded
      if (!posts) return;
  
      isFetchingPosts = true;
  
      // Load as many posts as there were present on the page when it loaded
      // After successfully loading a post, load the next one
      var loadedPosts = 0,
          postCount = $(".tag-master:not(.hidden) .post-list").children().length,
          callback = function() {
            loadedPosts++;
            var postIndex = postCount + loadedPosts;
  
            if (postIndex > posts.length-1) {
              disableFetching();
              $(".infinite-spinner").hide()
              return;
            }
  
            if (loadedPosts < postsToLoad) {
              fetchPostWithIndex(postIndex, callback);
            } else {
              isFetchingPosts = false;
            }
          };
  
      fetchPostWithIndex(postCount + loadedPosts, callback);
    }
  
    function fetchPostWithIndex(index, callback) {
      let post = posts[index];

      post = $.parseHTML(`<div class="group relative flex flex-row h-auto min-w-full rounded-lg shadow post">
      <a href="${post.url}" class="overflow-hidden grow">
        <img loading="lazy" class="min-w-full transition duration-300 ease-in-out group-hover:scale-110 brightness-[0.7] group-hover:brightness-50" src="${post.cover}" alt="" />
        <div class="absolute bottom-0 left-0 p-6 xl:p-8 2xl:p-12 ">
          <h1 class="text-white group-hover:text-amber-300 text-xl md:text-2xl xl:text-3xl 3xl:text-4xl font-extrabold uppercase ">${post.title}</h1>
          <p class="text-white group-hover:text-amber-300 md:mt-2 text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-bold">
            ${post.director} · ${post.year}
          </p>
        </div>
        </a>
  </div>`)
      $(".post-list").append(post)
      callback()
    }
    
    function disableFetching() {
      shouldFetchPosts = false;
      isFetchingPosts = false;
      $(".infinite-spinner").fadeOut();
    }
      
  });