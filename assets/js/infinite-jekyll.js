document.addEventListener("DOMContentLoaded", async () => {
  let posts;
  let isFetchingPosts = false;
  let shouldFetchPosts = true;
  let spinner = document.getElementById("infinite-spinner");

  // If there's no spinner, it's not a page where posts should be fetched
  if (!spinner) return;

  let postList = document.getElementById("post-list");
  let postsToLoad = 10;
  let loadNewPostsThreshold = 200;

  let data = await fetch("/movies/all-posts.json");
  data = await data.json();
  posts = data["posts"];

  // If there aren't any more posts available to load than already visible, disable fetching
  if (posts.length <= postsToLoad) disableFetching();

  // Load more posts if close to the end of the page
  window.addEventListener("scroll", function () {
    if (!shouldFetchPosts || isFetchingPosts) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - loadNewPostsThreshold
    ) {
      isFetchingPosts = true;
      fetchPosts();
      isFetchingPosts = false;
      console.log("ok")
    }
  });

  function fetchPosts() {
    if (!posts) return;

    let loadedPosts = 0;
    let postCount = postList.children.length;
    let callback = function () {
      loadedPosts++;
      let postIndex = postCount + loadedPosts;

      if (postIndex > posts.length - 1) {
        disableFetching();
        spinner.style.display = "none";
        return;
      }

      if (loadedPosts < postsToLoad)
        fetchPostWithIndex(postIndex, callback);
    };

    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    let post = posts[index];
    post = `<div class="group relative flex flex-row h-auto min-w-full rounded-lg shadow post">
    <a href="${post.url}" class="overflow-hidden grow">
      <img loading="lazy" class="min-w-full transition duration-300 ease-in-out group-hover:scale-110 brightness-[0.7] group-hover:brightness-50" src="${post.cover}" alt="" />
      <div class="absolute bottom-0 left-0 p-6 xl:p-8 2xl:p-12 ">
        <h1 class="text-white group-hover:text-amber-300 text-xl md:text-2xl xl:text-3xl 3xl:text-4xl font-extrabold uppercase ">${post.title}</h1>
        <p class="text-white group-hover:text-amber-300 md:mt-2 text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-bold">
          ${post.director} · ${post.year}
        </p>
      </div>
      </a>
      </div>`;
    let template = document.createElement("template");
    template.innerHTML = post;
    postList.appendChild(template.content.children[0]);
    callback();
  }

  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    spinner.remove();
  }
});
