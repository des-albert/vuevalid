<template>
  <q-page class="bg-page justify-center row q-py-md">
    <div class="q-mx-md">
      <q-table class="bg-section" title="Valid Configs" selection="single" :selected.sync="selected" :data="dataRows" :columns="columns" :visible-columns="visibleColumns" :pagination.sync="pagination" row-key="id" />
    </div>
    <div v-if="selected[0]" class="q-mt-md col-6">
      <q-card class="bg-valid" align="center">
        <q-form @submit="handleUpdate" @reset="handleDelete">
          <q-card-section class="text-txtNormal justify-center" style="font-size: 20px">
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
              <q-btn type="submit" class="bg-card">Update
              </q-btn>
              <q-btn type="reset" flat class="text-txtNormal">Delete
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
export default {
  name: 'Database',
  data() {
    return {
      validDate: null,
      selected: [],
      isPwd: false,
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  mounted() {
    this.getOptions()

    this.getConfigs()
  },
  computed: {
    ...mapGetters(['columns', 'visibleColumns', 'dataRows', 'validConfigs', 'validDates'])
  },
  methods: {
    getOptions() {
      this.$store.dispatch('getOptions')
    },
    getConfigs() {
      this.$store.dispatch('getConfigs')
    },
    handleDelete() {
      this.$store.dispatch('deleteConfig', {
        configId: this.selected[0].id
      })
    },
    handleUpdate() {
      this.$store.dispatch('updateConfig', {
        configId: this.selected[0].id,
        validDate: this.validDate
      })
    }
  }
}
</script>