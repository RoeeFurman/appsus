export default {
  template: `
  <div class="home-page-bg">
        <section class="home-page">
            <div class="home-page-logo">Welcome to Appsus</div>
            <div class="home-page-icons">
            <div class="home-page-icon"><router-link to="/mail">Mail<img src="img-notes/bx-mail-send.svg"></router-link></div>
            <div class="home-page-icon"><router-link to="/note">Note<img src="img-notes/bx-edit.svg"></router-link></div> 
            <!-- <div class="home-page-icon"><router-link to="/mail">Books<img src="img-notes/bx-book-open.svg"></router-link></div>  -->
            <div class="home-page-icon"><router-link to="/about">About<img src="img-notes/bx-info-circle.svg"></router-link></div> 
            <div>
        </section>
</div>
    `,
};
