const feedURL = 'https://status.cafe/users/cheepfish.atom';

      fetch(feedURL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          const entries = data.querySelectorAll("entry");
          let html = (entries.length < 1) ? `<p>No statuses yet.</p>`: '';
          if (entries.length > 1) 
            for (i = 0; i < 1; i++) {
              let title = entries[i].querySelector("title").innerHTML.slice(0, 12).trim();
              let content = entries[i].querySelector("content").textContent.trim();
              let dateString = entries[i].querySelector("published").innerHTML.slice(0,10);
              html += `
                <p>${title} - ${dateString}</p>
                <p>${content}</p>
              `;
          }
          html += `<p><a href='https://status.cafe/users/cheepfish'>See more at StatusCafe</a></p>`;
          document.getElementById("feed-reader").innerHTML = html;
        })