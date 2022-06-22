let artistService = (function () {
    function getArtistList(artistSortingType, page, callback, error) {
        console.log("getList")
        let pageNum = page || 1;
        $.ajax({
            url: "/artist/artistList/" + artistSortingType + "/" + pageNum,
            type: "get",
            // data: JSON.stringify(type),
            dataType: "json",
            contentType: "application/json",
            success: function (artistPageDTO) {
                if(callback) {
                    callback(artistPageDTO.total, artistPageDTO.list);
                }
            },
            error: function (xhr, status, er) {
                if(error)   {
                    error(xhr, status, er);
                }
            }
        })
    }
    return {getArtistList:getArtistList}
})();

// 기본 전역변수
let pageNum = 1;
let artistSortingType = "NEW";
let artistDiv = $(".ms-list-imgs");


// div 변하는 function 선언
function artistList(artistSortingType, page){
    console.log("새로고침 됐슈")

    artistService.getArtistList(artistSortingType, page, function (total, list) {
        let str = "";

        if(list == null || list.length == 0){
            artistDiv.html("");
            return;
        }

        $.each(list, function(i, artist){
            let artistInfoNumber = Number(artist.artistNumber);
            str += "<a style='cursor:pointer;' onclick='go_to_artist_info('/artist/artistInfo');' title='아티스트 이름'>"
            str += "<div class='list-bigger-wrap'>"
            str += "<img class='lazyload' alt='아티스트 이름' src='/images/artist/buskerbukser.jpg' style=''>"
            str += "<div class='list-bigger-txt'>"
            str += "<p class='list-b-tit1 v2 v2'>" + artist.artistName + "</p>"
            str += "</div>"
            str += "</div>"
            str += "</a>"
        });

        artistDiv.html(str);
        artistPage(artistSortingType, total);
    }, function (a, b, c) {
        console.log(a, b, c)
    });
}

$(document).ready(function () {
    // 새로고침 첫 실행 (type : A, pageNum : 1 (기본값))
    artistList(artistSortingType, pageNum);
})

let currentSort = ".NEW";
function sortChange(e) {
    $(currentSort).attr("id", "non-current");
    currentCategory = e;
    $(currentSort).attr("id", "current");
}

function artistPage(artistSortingType, total) {
    let endPage = Math.ceil(pageNum / 10.0) * 10; // 올림
    let startPage = endPage - 9;
    let realEnd = Math.ceil(total / 10.0);  // 올림
    const $paging = $(".paging");

    if (endPage > realEnd) {
        endPage = realEnd;
    }

    let prev = startPage > 1;
    let next = endPage * 10 < total;
    let str = "";

    str += "<div class='big-width mypage-pageStyle' style='text-align: center'>"
    str += "<a class='mypage-page-first'>" + "<<" + "</a>"

    if (prev) {
        str += "<a class='changePage' href='" + (startPage - 1) +  "><code>&lt;</code></a>"
    }
    for (let i = startPage; i <= endPage; i++) {
        str += pageNum == i ? "<code>" + i + "</code>" : "<a class='changePage mypage-page-next' href='" + i + "'><code>" + i + "</code></a>";
    }
    if (next) {
        str += "<a class='changePage' href='" + (endPage + 1) + "'><code>&gt;</code></a>"
    }

    str += "<a class='mypage-page-last'>>></a></div>"
    $paging.html(str);

}


$(".paging").on("click", "a.changePage", function (e) {
    e.preventDefault();
    pageNum = $(this).attr("href");
    artistList(artistSortingType, pageNum);
})

$("a.goRead").click(function (e) {
    e.preventDefault();
    location.href = "/concert/concertPlanInfo" + paging + "&showNumber=" + $(this).attr('href');
});


    $(function () {
        $('.lazyload').Lazy({
            effect: "fadeIn",
            effectTime: 200,
            defaultImage: 'http://tkfile.yes24.com' + '/imgNew/common/noimg.gif'
        });
    });
    $(function () {

        $(".li-sec-tit2").on('click', function (e) {
            if ($(this).is(".on")) {
                e.preventDefault();
                $(this).removeClass("on");
                $(".li-sec-select").slideUp();

            } else {
                e.preventDefault();
                $(this).addClass("on");
                $(".li-sec-select").slideDown();
            }
        });
        $(document).mouseup(function (e) {
            var container = $(".li-sec-tit2");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".li-sec-select").slideUp();
                $(".li-sec-tit2").removeClass("on");
            }
        });
    });



function go_to_url(url) {
    location.href=url;
}

function go_to_artist_info(artist_no) {
    location.href=artist_no;
}


function artistSort1() {

    $('.li-sec-tag a').removeClass("on");
    $('.li-sec-tag').find("a[token='3']").addClass("on")
}



function artistSort2() {

    $('.li-sec-tag a').removeClass("on");
    $('.li-sec-tag').find("a[token='0']").addClass("on")
}

$(".NEW").click(function (e) {
    sortChange(".NEW");
    e.preventDefault();

    pageNum = 1;
    artistList("NEW", pageNum);
})

$(".LIKE").click(function (e) {
    sortChange(".LIKE");
    e.preventDefault();

    pageNum = 1;
    artistList("LIKE", pageNum)
})



// $(document).ready(function () {
//     jsf_genre_GetGenreList('15456', '1', '3');
//
//     $('.li-sec-tag a').each(function () {
//         $(this).unbind('click.btnGenreListTab').bind('click.btnGenreListTab', function (e) {
//             e.preventDefault();
//             $("#pCurPage").val(1);
//             jsf_genre_GetGenreList('15456', '1', $(this).attr('token'));
//         });
//
//     });
//
// });
//
// //Scroll Event
// var asyncType = false;
// var didScroll;
// var lastScrollTop;
//
// $(window).scroll(function (event) {
//     didScroll = true;
// });
//
// setInterval(function () {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 1);
//
// function hasScrolled() {
//     var scrollT = $(this).scrollTop();
//     var scrollH = $(this).height();
//     var list_secH = $(".list-sec").height();
//
//     if (scrollT > lastScrollTop) {
//         //Scroll Down
//         if (scrollT + scrollH + 150 >= list_secH) {
//             var curPage = parseInt($("#pCurPage").val());
//             var lastPage = Math.ceil($("#ListTotalCnt").val() / $("#pPageSize").val());
//             if (curPage < lastPage) {
//                 if(asyncType){
//                     return;
//                 }
//                 $("#pCurPage").val(curPage + 1);
//                 jsf_genre_GetGenreList('15456', '1', $('.li-sec-tag').find('a[class*="on"]').attr('token') );
//                 asyncType = true;
//             }
//         }
//     }
//
//     lastScrollTop = scrollT
// }


