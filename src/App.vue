
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo darken-3"
      dark
    >
      <v-toolbar-title>AutoJSON for Podkast</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="podcast-helper-main"
        max-width="800"
      >

        <v-row
          class="mb-6"
          align="center"
          justify="center"
        >
          <v-col>
            <v-card 
              class="elevated-12"
            >
                <v-toolbar dark color="indigo">
                  <v-toolbar-title>Metadata</v-toolbar-title>
                </v-toolbar>
                <v-card-text
                  color="white"
                >                  
                <v-form>
                  <v-container grid-list-xs>
                    <v-row>
                      <v-col>
                        <v-autocomplete
                          v-model="showID"
                          :items="allPrograms"
                          item-text="name"
                          item-value="id"
                          label="Programnavn"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="imageURL"
                          name="logo-url"
                          label="Logo URL"
                          id="logo-url-field"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>

                        <v-autocomplete
                          v-model="categories"
                          :items="allCategories"
                          label="Itunes-kategori"
                          chips
                          deletable-chips
                          multiple
                        >

                        </v-autocomplete>
                        
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="subtitle"
                          name="short-description"
                          label="Kort beskrivelse"
                          id="short-description-field"
                       ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                          v-model="description"
                          name="long-description"
                          label="Lang beskrivelse"
                          id="long-description-field"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>  
                </v-form>
                </v-card-text>
            </v-card>  
          </v-col>  

          <v-col>
              <v-container grid-list-xs>
                <v-row>
                  <v-col>
                  <v-card>
                    <v-toolbar dark color="indigo">
                      <v-toolbar-title>JSON</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <code 
                        v-if="isShowIDValid"
                        flex  
                      >
                      {{jsonblob}}
                      </code> <br> <br>
                      <v-btn
                        v-if="isShowIDValid" 
                        @click="copyJSONBlobToClipBoard"
                      >
                        Kopier til utklippstavle
                      </v-btn>
                      <p v-else>
                        Velg et program for å få opp JSON!
                      </p>
                    </v-card-text>
                  </v-card> 
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card>
                      <v-toolbar dark color="indigo">
                        <v-toolbar-title>Bilde</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-img 
                          v-if="isImageURLPresent"
                          :aspect-ratio="1/1" 
                          max-width="200px"
                          v-bind:src="imageURL">
                        </v-img>
                      </v-card-text>
                    </v-card> 
                  </v-col>
                </v-row>
              </v-container>
          </v-col>  
          
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo darken-3"
      app
    >
      <span class="white--text">&copy; Studentmediene i Trondheim</span>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from "axios"
  import { getFlattenedCategories } from "./categories"

  export default {
    props: {
      source: String,
    },
    data: () => ({
      showID: null,
      imageURL: "",
      categories: [],
      subtitle: "",
      description: "",

      allPrograms: [],
      allCategories: getFlattenedCategories(),
    }),
    computed: {
      isImageURLPresent: function() {
        return !!this.imageURL
      },
      isShowIDValid: function() {
        return !!this.showID
      },
      jsonblob: function() {
        const output = {
          ...(this.isImageURLPresent && {"image": this.imageURL}),
          "category": this.categories,
          "subtitle": this.subtitle,
          "description": this.description,
        }
        return "\"" + this.showID + "\": " + JSON.stringify(output, null, "\t") + ","
      },
    },
    methods: {
      foo: function() {
        console.log("bar")
      },
      copyJSONBlobToClipBoard: function() {
        const el = document.createElement('textarea');
        el.value = this.jsonblob;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
    },

    mounted() {
      console.log("categories", getFlattenedCategories())
      axios.get("http://api.radiorevolt.no/v1/programmer/list/").then(
        response => {
          this.allPrograms = response.data.filter(program => !program.old)
          console.log(this.allPrograms)
        }
      ).catch(error => {
        console.log(error)
      })
    }
  }
</script>