if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}


// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const community_id = urlParams.get("id");

async function CommunityDetail(community_id) {
    const community = await getCommunityDetail(community_id);

    const user = document.getElementById("user");
    const title = document.getElementById("title");
    const content = document.getElementById("content");

    user.setAttribute("id", community.user);
    user.setAttribute("onclick", "getProfilePage(this.id)");

    user.innerText = community.user;
    title.innerText = community.title;
    content.innerText = community.content;
}
CommunityDetail(community_id);