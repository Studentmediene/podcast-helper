
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Podcast-helper</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height podcast-helper-main"
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
                <v-form>
                  <v-container grid-list-xs>
                    <v-row>
                      <v-col>
                        <h2>
                          Podcast JSON-helper
                        </h2>
                      </v-col>
                    </v-row>
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
                        <v-text-field
                          v-model="description"
                          name="long-description"
                          label="Lang beskrivelse"
                          id="long-description-field"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>  
                </v-form>
            </v-card>  
          </v-col>  

          <v-col>
            <v-card class="elevated-12">
              <v-container grid-list-xs>
                <code v-if="isShowIDValid">
                  {{ jsonblob }}
                </code>
                <br>
                ShowID: {{ showID }}
                <br>
                Image:  
                <v-img 
                  v-if="isImageURLPresent"
                  :aspect-ratio="1/1" 
                  v-bind:src="imageURL">
                </v-img>
                <br>
                Subtitle {{ subtitle }}
                <br>
                Description {{ description }}
              </v-container>
            </v-card>
          </v-col>  
          
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
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
      jsonoutput: function() {
        return {
          ...(this.isImageURLPresent && {"image": this.imageURL}),
          "category": this.categories,
          "subtitle": this.subtitle,
          "description": this.description,
        }
      },
      jsonblob: function() {
        // We need at least to pick a show to make a vaild json
        if (!this.isShowIDValid) {
          return "Velg et program!"
        }

        return this.showID + ": " + JSON.stringify(this.jsonoutput, null, "\t")
      },
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