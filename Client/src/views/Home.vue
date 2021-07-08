<template>
    <div>
        <router-link to="/logout" class="mb-4">Logout</router-link>
        <div class="home">
            <form class="form-inline" action="" @submit="searchByDate">
                <div class="row">
                    <div class="col-2 my-auto">
                        <label>Select date range:</label>
                    </div>
                    <div class="col-2">
                        <DatePicker :placeholder="'Select datetime'" @select-date="selectedDate"
                                    :switch-button-initial="false"/>
                    </div>
                    <div class="col-1">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            <div class="mt-3">
                <p>Start date: {{startDate}} <br> End date: {{endDate}}</p>
            </div>
            <EventTable @getPage="searchByDate" :records="eventData"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import EventTable from '@/components/EventTable.vue';
    import DatePicker from 'vue-time-date-range-picker/dist/vdprDatePicker';

    export default {

        name: 'Home',
        data() {
            return {
                startDate: "2021-01-02T00:22:38.190Z",
                endDate: "2021-01-02T00:34:59.819Z",
                eventData: []
            }
        },
        components: {
            DatePicker,
            EventTable,
        },
        mounted() {
            this.searchByDate();
        },

        methods: {
            searchByDate(event = null, page = 1) {
                if (event !== null) {
                    event.preventDefault();
                }
                const params = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    page: page,
                    limit: 10,
                }
                this.axios.get('events/getByDateRange', {params}).then((response) => {
                    this.eventData = response.data;
                })
            },
            selectedDate(startDate, endDate) {
                this.startDate = startDate.toISOString();
                this.endDate = endDate.toISOString();
            }
        }
    }
</script>


<style>
    .vdpr-datepicker input {
        display: block;
        width: 100%;
        padding: .375rem .75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
</style>
