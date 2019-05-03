(function(win, doc) {
    'use strict';
    var $card = doc.querySelector('[data-js="card"]');
    var $mediumIcon = doc.querySelector('[data-js="medium-icon"]');
    var $backButton = doc.querySelectorAll('[data-js="card-back"]');
    $mediumIcon.addEventListener('click', function(e) {
        e.preventDefault();
        $card.classList.add('card--active');
    }, false);
    $backButton.forEach(function(item) {
        item.addEventListener('click', function(e) {
            $card.classList.remove('card--active');
        }, false);
    });
    var ajax = new XMLHttpRequest();
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var returned = JSON.parse(ajax.responseText);
            var postsObject = returned.posts;
            for (var key in postsObject) {
                if (!postsObject.hasOwnProperty(key)) continue;
                var post = postsObject[key];
                console.log(post);

                function createMarkup(post) {
                    return (`
          <li class="card-list__item">
            <a href="https://medium.com/@cahitberkay/${post.uniqueSlug}" class="card-list__item-title" target="_blank" title="${post.title}">${post.title}</a>
          </li>
          `);
                };
                doc.querySelector('[data-js="post-list"]').innerHTML += createMarkup(post);
            }
        }
    }
    var data = JSON.stringify({
        "profile": "cahitberkay"
    });
    ajax.send(data);
})(window, document);