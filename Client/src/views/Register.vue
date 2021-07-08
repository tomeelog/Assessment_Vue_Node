<template>
    <div id="login-view">
        <form @submit="login" class="form-signin">
            <i class="bi bi-door-open-fill text-primary"></i>
            <p>Event app</p>
            <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            <label for="inputName" class="sr-only">Name</label>
            <input :disabled="loading" name="name" type="text" id="inputName" class="form-control mb-3"
                   placeholder="Name"
                   required
                   autofocus>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input :disabled="loading" name="email" type="email" id="inputEmail" class="form-control mb-3"
                   placeholder="Email address"
                   required>
            <label for="inputPassword" class="sr-only">Password</label>
            <input :disabled="loading" minlength="6" name="password" type="password" id="inputPassword"
                   class="form-control mb-3" placeholder="Password"
                   required>
            <p>{{error}}</p>
            <button :disabled="loading" class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
            <p>Have an account? <router-link to="/login">Login</router-link></p>
        </form>
    </div>
</template>

<script>
    // import axios from 'axios';
    import toastr from 'toastr';

    export default {
        name: "Register",

        data() {
            return {
                error: "",
                loading: false
            }
        },
        mounted() {
        },
        methods: {
            login(event) {
                this.loading = true;
                event.preventDefault();
                const postData = {
                    name: event.target.name.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                }
                this.axios.post('user/register', postData).then(() => {
                    toastr.success("Registration successful");
                    this.loading = false;
                    this.$router.push('/login');
                }).catch(err => {
                    toastr.error("Something went wrong");
                    this.loading = false;
                    if (err.response.status === 400) {
                        this.error = err.response.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #login-view {
        height: 100%;
    }

    #login-view {
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    i.bi {
        font-size: 70pt;
    }
</style>
