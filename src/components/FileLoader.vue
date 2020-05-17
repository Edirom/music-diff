<template>
  <div>
    <div id="intro">MusicDiff allows you to compare two music encodings. At this point, these encodings need to conform to a very strictly controlled version of <a href="https://music-encoding.org" target="_blank">MEI</a>. The <a href="https://raw.githubusercontent.com/BeethovensWerkstatt/module2/dev/data/schema/bw_module2_works.rng" target="_blank">RelaxNG</a> schema for this variant of MEI has been expressed in <a href="https://github.com/BeethovensWerkstatt/module2/blob/dev/data/odd/bw_module2_works.odd" target="_blank">ODD</a>. The tool is a stripped-down version of Beethovens Werkstatt's <a href="https://videapp-arr.beethovens-werkstatt.de" target="_blank">VideApp<sub>Arr</sub></a>, which is maintained on <a href="https://github.com/BeethovensWerkstatt/videapp-arr" target="_blank">GitHub</a>. We hope to integrate additional functionality from the underlying VideApp<sub>Arr</sub> (which is used to compare a number of Beethoven's arrangements of his own works), and to combine it with additional functionality from the <a href="https://meigarage.edirom.de" target="_blank">MEI Garage</a>, which would allow to upload music encodings in various formats. Contributors to this task are highly welcome to <a href="https://github.com/Edirom/music-diff" target="_blank">join</a> :)</div>
    <div id="uploads">
      <div class="uploadBox">
        <label>File 1</label>
        <input id="file1upload" type="file" v-on:change="setComparable" accept=".xml,.mei"/>
      </div>
      <div class="uploadBox">
        <label>File 2</label>
        <input id="file2upload" type="file" v-on:change="setComparable" accept=".xml,.mei"/>
      </div>
    </div>
    <div id="processBox">
      <button id="compareBtn" :disabled="!canCompare" v-on:click="compareFiles" class="btn btn-primary">Compare files</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'FileLoader',
  components: {

  },
  data: () => { return {
    canCompare: false
  }},
  methods: {
    "compareFiles": function() {

      let file1 = document.getElementById('file1upload').files[0]
      let file2 = document.getElementById('file2upload').files[0]

      let prom1 = new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsText(file1)
      })

      let prom2 = new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsText(file2)
      })

      Promise.all([prom1, prom2]).then((output) => {

        let parser = new DOMParser()
        let serializer = new XMLSerializer()

        let xml1 = parser.parseFromString(output[0], 'application/xml')
        let xml2 = parser.parseFromString(output[1], 'application/xml')

        let meiCorpus = document.implementation.createDocument('http://www.music-encoding.org/ns/mei', 'meiCorpus')

        let mei1 = xml1.querySelector('mei')
        let mei2 = xml2.querySelector('mei')

        meiCorpus.firstChild.appendChild(mei1)
        meiCorpus.firstChild.appendChild(mei2)

        let combination = serializer.serializeToString(meiCorpus)
        this.$store.dispatch('compareFiles', combination)
      })

    },
    "setComparable": function () {
      this.canCompare = document.getElementById('file1upload').files.length === 1 && document.getElementById('file2upload').files.length === 1
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
 #intro {
   margin: 2rem auto 5rem;
   max-width: 60%;
 }

 #uploads {
   padding: 1rem;
   text-align: center;

   .uploadBox {
     display: inline-block;

     label {
       display: block;
       font-weight: 700;
       margin: 0 0 .3rem;
     }
   }
 }

 #processBox {
   padding: 1rem;
 }
</style>
