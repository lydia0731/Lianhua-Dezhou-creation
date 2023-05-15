$(function() {
    getNewArtice();
    // getNewImage();

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
    let url = apiUrl + 'getAllData'
    let body = {
        collection: 'artice'
    };

    callApi(url, 'post', body)
    .then((docs) => {
        let articeHtml = '';
        const toDay = new Date();
        docs.forEach((doc) => {
            let time = new Date(doc.data.time);

            // 發文時間若為近期一個月內，則顯示
            let numberOfDays = (toDay.getTime() - time.getTime()) / (1000 * 3600 * 24);

            if(numberOfDays <= 30) {
                // col-lg-4 col-md-6
                articeHtml += `<div class="col-lg-6 col-md-12">
                    <div class="ud-single-testimonial wow fadeInUp" data-wow-delay=".1s" >
                        <div class="ud-testimonial-content">
                            <a href="blog?n=${doc.id.replace(' ', '')}"><h6>${doc.data.title}</h6></a>
                        </div>
                        <div class="ud-testimonial-info">
                            <!-- <div class="ud-testimonial-image">
                                <img src="/images/01.png" alt="author" />
                            </div> -->
                            <div class="ud-testimonial-text">
                                <p style="font-size: 12px;">${doc.data.time}</P>
                                <p style="font-size: 14px;">標籤：${
                                    doc.data.tag.map((item) => {
                                        return item;
                                    }).join('、')
                                }</p>
                                <p>${doc.data.content.substr(0, 39)}......
                                    <a href="blog?n=${doc.id.replace(' ', '')}" style="font-size: 10px;">閱讀更多</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        });

        if(!articeHtml) {
            articeHtml = `<div class="text-center">
                <p>中之發懶中，最近沒產糧(X</p>
            </div>`;
        }
        $('#newArtice').append(articeHtml);
    })
    .catch(error => {
        console.error(error);
    });
}

function getNewImage() {
    let url = apiUrl + 'getAllData'
    let body = {
        collection: 'picture'
    };

    callApi(url, 'post', body)
    .then((docs) => {
        let imageHtml = '';
        const toDay = new Date();
        docs.forEach((doc) => {
            let time = new Date(doc.data.time);

            // 委託時間若為近期一個月內，則顯示
            let numberOfDays = (toDay.getTime() - time.getTime()) / (1000 * 3600 * 24);
            if(numberOfDays <= 30) {
                imageHtml += `<div class="col-xl-3 col-lg-3 col-sm-6" data-i-d="${doc.id}">
                    <div class="ud-single-team wow fadeInUp" data-wow-delay=".1s">
                    <div class="ud-team-image-wrapper">
                        <div class="ud-team-image">
                            <img src="${doc.data.imageUrl}" alt="draw" />
                        </div>
                        <img src="/images/draw/dotted-shape.svg" alt="shape" class="shape shape-1" />
                        <img src="/images/draw/shape-2.svg" alt="shape" class="shape shape-2" />
                    </div>
                    <div class="ud-team-info">
                        <h5>繪師：${doc.data.name}</h5>
                    </div>
                        <ul class="ud-team-socials">
                            ${doc.data.pages.map((page) => {
                                return `<li>
                                    <a href="${page.url}">
                                        <i class="lni lni-${page.type}-filled"></i>
                                    </a>
                                </li>`;
                            }).join('')}
                        </ul>
                    </div>
                </div>`;
            }
        });

        if(!articeHtml) {
            articeHtml = `<div class="text-center">
                <p>近期沒有委託!</p>
            </div>`;
        }
        $('#newImage').append(imageHtml);
    })
    .catch(error => {
        console.error(error);
    });
}