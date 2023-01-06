"use strict";

  // your event listener code goes here

  // This is the global list of the stories, an instance of StoryList
  let storyList;

  /** Get and show stories when site first loads. */

  async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStories();
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
  }

  /**
   * A render method to render HTML for an individual Story instance
   * - story: an instance of Story
   *
   * Returns the markup for the story.
   */

  {
    /* <i class='far fa-star'></i>
 <span>
            <input class="blue" type="checkbox" id="check" name="1">
           <label for="check">
           </label>
           </span> */
  }

  function generateStoryMarkup(story) {
    // console.debug("generateStoryMarkup", story);
    const hostName = story.getHostName();
    return $(`
                 <label for="checkbox-id">
                  <input type="checkbox" value="" id="checkbox-id">
                      <i class="fas fa-star"></i>
                  </label>

            <li id="${story.storyId}">
           
              <a href="${story.url}" target="a_blank" class="story-link">
                ${story.title}
              </a>
              <small class="story-hostname">(${hostName})</small>
              <small class="story-author">by ${story.author}</small>
              <small class="story-user">posted by ${story.username}</small>
            </li>
           
           
     
    `);
  }

 $allStoriesList.on('click', function(e){
  e.preventDefault()
  if($(e.target) .is('.fa-star')){
    const $closestLi = $(e.target).closest('li');
    let storyId= $closestLi.attr('id');
    console.log(storyId)
  }

 })







  // $(".fas fa-star").on("click", function (e) {
  //   e.preventDefault();
  //   console.log(e.target);
  // });

  // $("#checkbox-id").click(function (e) {
  //   e.preventDefault();
  //   console.log("heyyy");
  //   // code to be executed when the checkbox is clicked
  // });

  // $allStoriesList.on('click', function(e){
  //    e.preventDefault()
  //    console.log(e.target.type)
  // //   if(e.target.classList.contains('blue')){
  // //     console.log(e.parentElement)

  //   })

  //  let btn = document.querySelector('#check')
  // btn.addEventListner('click',function(e){
  // console.log(e)
  // })

  /** Gets list of stories from server, generates their HTML, and puts on page. */

  function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }

    $allStoriesList.show();
  }

  async function createNewStory() {
    let author = $Author.val();
    let title = $Title.val();
    let url = $url.val();
    let username = currentUser.username;
    let storyData = { title, author, url, username };
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsdWUgdGhlIGNhdCIsImlhdCI6MTY3MzAwNTM3MX0.8xHIq0HcR5xa9kpU9FgfHnr6TOWeNve0S7stIAy-lY0"
    const res = await storyList.addStory(currentUser, storyData);
    let $story = generateStoryMarkup(res);
    $newStoryForm.trigger("reset");
    $newStoryForm.hide();
    $allStoriesList.prepend($story);
  }

  $newStoryForm.on("submit", function (e) {
    e.preventDefault();
    createNewStory();
  });

  $favorites.on("click", function (e) {
    e.preventDefault();
    $userFavorites.removeClass("hidden");
  });









