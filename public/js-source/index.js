// const moment = require('moment');

$(function() {
    getNewArtice();

    // ==== for menu scroll
    const pageLink = document.querySelectorAll(".ud-menu-scroll");
    pageLink.forEach((elem) => {
        elem.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(elem.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            offsetTop: 1 - 60,
            });
        });
    });

    // section menu active
    function onScroll(event) {
        const sections = document.querySelectorAll(".ud-menu-scroll");
        const scrollPos =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        for (let i = 0; i < sections.length; i++) {
            const currLink = sections[i];
            const val = currLink.getAttribute("href");
            const refElement = document.querySelector(val);
            const scrollTopMinus = scrollPos + 73;
            if (
            refElement.offsetTop <= scrollTopMinus &&
            refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
            ) {
            document
                .querySelector(".ud-menu-scroll")
                .classList.remove("active");
            currLink.classList.add("active");
            } else {
            currLink.classList.remove("active");
            }
        }
    }

    window.document.addEventListener("scroll", onScroll);
})

function getNewArtice() {
    let url = apiUrl + 'getAllArtice'
    let body = {
        collection: 'artice'
    };

    callApi(url, 'post', body)
    .then(docs => {
        let articeHtml = '';
        const toDay = new Date();
        docs.forEach((doc) => {
            let time = new Date(doc.data.time);

            // 發文時間若為近期一個月內，則顯示
            let milliseconds_Time = (toDay.getTime() - time.getTime()) / (1000 * 3600 * 24);
            if(milliseconds_Time <= 30) {
                articeHtml += `<div class="col-lg-4 col-md-6" data-i-d=${doc.id}>
                    <div class="ud-single-testimonial wow fadeInUp" data-wow-delay=".1s" >
                        <div class="ud-testimonial-content">
                            <a href="blog?n=${doc.id}"><h6>${doc.data.title}</h6></a>
                        </div>
                        <div class="ud-testimonial-info">
                            <!-- <div class="ud-testimonial-image">
                                <img src="/images/01.png" alt="author" />
                            </div> -->
                            <div class="ud-testimonial-text">
                                <p style="font-size: 12px;">${doc.data.time}</P>
                                <p style="font-size: 14px;">標籤：${doc.data.tag.map(item => {return item;}).join('、')}</p>
                                <p>${doc.data.content.substr(0, 39)}......
                                    <a href="blog?n=${doc.id}" style="font-size: 10px;">閱讀更多</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        });
        $('#newArtice').append(articeHtml);
    })
    .catch(error => {
        console.error(error);
    });
}

