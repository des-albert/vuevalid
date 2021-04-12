<template>
  <q-page class="bg-page justify-center row q-py-md">
    <div class="col-6" style="max-width: 500px">
      <q-card class="bg-card" align="center" style="font-size: 20px">
        <q-card-section class="text-txtNormal justify-center">
          Config Validator
        </q-card-section>

        <q-form @submit="handleSubmit">
          <div v-for="option in options" v-bind:key="option.label">
            <q-card-section class="bg-section row justify-center">
              <q-select :options="option.values" v-model="config[option.label]" class="bg-card" :label="option.label" style="width: 250px" popup-content-class="bg-drop" options-selected-class="text-deep-orange">
                <template v-slot:prepend>
                  <q-icon :name="option.icon" />
                </template>
              </q-select>
            </q-card-section>
          </div>

          <div class="bg-drop row q-pa-sm justify-center">
            <q-btn type="submit">submit
            </q-btn>
          </div>
        </q-form>
      </q-card>

      <q-card v-show="isVisible && isValid" class="bg-valid" align="center">
        <q-card-section class="text-txtNormal justify-center" style="font-size: 20px">
          Config valid from {{ validDate }}
        </q-card-section>
      </q-card>

      <q-card v-show="isVisible && !isValid" class="bg-valid" align="center">
        <q-form @submit="handleSave" @reset="handleCancel">
          <q-card-section class="text-txtNormal justify-center" style="font-size: 20px">
            Invalid Config - Enter password and validity date
            <div class="row q-pa-sm justify-center">
              <q-input v-model="password" autocomplete="off" label="Password" :type="isPwd ? 'password' : 'text'">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="bg-drop row q-pa-sm justify-center">
              <q-date v-model="validDate" minimal mask="MMM DD YYYY" dark />
            </div>
            <div class="bg-drop row q-pa-sm justify-center">
              <q-btn type="submit" class="bg-card">Save Config
              </q-btn>
              <q-btn type="reset" flat class="text-txtNormal">Cancel
              </q-btn>
            </div>
          </q-card-section>
        </q-form>
      </q-card>

    </div>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Home',
  data() {
    return {
      config: {},
      isVisible: false,
      isValid: false,
      password: null,
      validDate: null,
      isPwd: true
    }
  },
  mounted() {
    this.getOptions()
    this.getConfigs()
  },

  computed: {
    ...mapGetters(['options', 'validConfigs', 'validDates'])
  },
  methods: {
    getOptions() {
      this.$store.dispatch('getOptions')
    },
    handleSubmit() {
      const equal = (element) => _.isEqual(element, this.config)
      if (this.validConfigs.some(equal)) {
        var index = this.validConfigs.findIndex(equal)
        this.validDate = this.validDates[index]
        this.isVisible = true
        this.isValid = true
      } else {
        this.isVisible = true
        this.isValid = false
      }
    },
    handleSave() {
      if (this.password == 'HPEvalid') {
        this.$store.dispatch('addConfig', {
          jsonConfig: JSON.stringify(this.config),
          validDate: this.validDate
        })
        this.isValid = true
      }
    },
    handleCancel() {
      this.isVisible = false
      this.isValid = false
    },
    getConfigs() {
      this.$store.dispatch('getConfigs')
    }
  }
}
</script>
