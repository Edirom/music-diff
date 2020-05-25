<template>
  <header class="navbar">
      <section class="navbar-section">
        <a id="meiLink" href="http://music-encoding.org" target="_blank" class="btn btn-link"><img alt="Music Encoding Initiative" id="meiLogo" src="../assets/meilogo.png"></a>
        <a id="meiGarage" href="https://meigarage.edirom.de" target="_blank" class="btn btn-link"><img alt="MEI Garage" id="garageLogo" src="../assets/meigarage.logo.png"></a>
      </section>
      <section class="navbar-center">
          <div>
              <div class="appTitle">MusicDiff</div>
          </div>
      </section>
      <section class="navbar-section">
          <a id="vifeLink" href="https://edirom.de" target="_blank" class="btn btn-link"><img alt="ViFE" id="vifeLogo" src="../assets/vife-logo.svg"></a>
          <a id="bwLink" href="https://beethovens-werkstatt.de" target="_blank" class="btn btn-link"><img alt="Beethovens Werkstatt" id="bwLogo" src="../assets/beethovensw_finale01.png"></a>
      </section>
  </header>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AppHeader',
  components: {

  }
}
</script>

<style scoped lang="scss">
  header {
    background-color: #f5f5f5;
    border-bottom: 0.5px solid #cccccc;
    height: 2rem;

      #meiLink {
        margin: 0;
        padding: 0 1rem;
        line-height: 1rem;
        position: absolute;
        top: 0.1rem;

        #meiLogo {
          width: 3rem;
        }
      }

      #meiGarage {
        margin: 0;
        padding: 0 1rem;
        line-height: 1rem;
        position: absolute;
        top: 0.1rem;
        left: 4rem;

        #garageLogo {
          width: 3rem;
        }
      }

      .appTitle {
        font-size: 1.1rem;
        font-weight: 100;

        sub {
          font-weight: 500;
        }
      }

      #openModalBtn {
          font-size: .8em;
          font-weight: 100;
          cursor: pointer;
          text-align: center;
      }

      #githubLogo {
          color: transparent;
          background-image: url('../assets/GitHub-Mark-120px-plus.png');
          background-size: 32px 32px;
          background-repeat: no-repeat;
      }

      #vifeLink {
        margin: 0;
        padding: 0 1rem;
        line-height: 1rem;
        position: absolute;
        top: -0.2rem;

        #vifeLogo {
          width: 2.5rem;
        }
      }

      #bwLink {
        margin: 0;
        padding: 0 1rem;
        line-height: 1rem;
        position: relative;
        top: .2rem;
        right: 3rem;

        #bwLogo {
          width: 4.5rem;
        }
      }
}
</style>
