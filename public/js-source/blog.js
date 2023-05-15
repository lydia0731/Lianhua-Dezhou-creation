$(function() {
    initPage();
})

function initPage() {
    console.log(articeNumber, articeType)
    let url = apiUrl + 'getArtice',
        body = {
            collection: 'artice',
            id: articeNumber,
            type: articeType // all or type(例: 主線序、主線番外)
        };
    callApi(url, 'post', body)
    .then((docs) => {
        let html = '';
        if(!articeNumber) {
            // 列出文章清單
            // console.log('show artice list!', docs);
            docs.forEach((doc) => {
                html += `<div class="col-md-12">
                    <div class="ud-single-testimonial wow fadeInUp" data-wow-delay=".1s" >
                        <div class="ud-testimonial-content">
                            <a href="blog?n=${doc.id.replace(/ /g, '')}"><h6>${doc.data.title}</h6></a>
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
                                    <a href="blog?n=${doc.id.replace(/ /g, '')}" style="font-size: 10px;">閱讀更多</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;    
            });
        } else {
            // console.log('show artice!', docs);
            let data = docs[0].data;
            html = `<h2 class="ud-blog-details-title">${data.title}</h2>
            <p class="ud-blog-details-para">${data.time}</p>
            <p class="ud-blog-details-para">${data.content.replace(/ /g, '<br>')}</p>
            <div class="ud-blog-details-action">
                <ul class="ud-blog-tags">
                    ${data.tag.map((tag) => {
                        return `<li>
                            <a href="${webUrl}blog?t=${tag}">${tag}</a>
                        </li>`;
                    }).join('')}
                </ul>
            </div>`;
        }
        $('#blogDetails').append(html || '');
    })
}