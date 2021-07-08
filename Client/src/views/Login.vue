<template>
    <div id="login-view">
        <form @submit="login" class="form-signin">
            <i class="bi bi-door-open-fill text-primary"></i>
            <p>Event App</p>
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input :disabled="loading" name="email" type="email" id="inputEmail" class="form-control mb-3"
                   placeholder="Email address"
                   required
                   autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input :disabled="loading" minlength="6" name="password" type="password" id="inputPassword"
                   class="form-control mb-3" placeholder="Password"
                   required>
            <p>{{error}}</p>
            <button :disabled="loading" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p>Don't have an account?
                <router-link to="/register">Sign Up</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    import toastr from 'toastr';

    export default {
        name: "Login",

        data() {
            return {
                error: "",
                loading: false,
            }
        },
        methods: {
            login(event) {
                event.preventDefault();
                this.loading = true;
                const postData = {
                    email: event.target.email.value,
                    password: event.target.password.value,
                }
                this.axios.post('user/login', postData).then((response) => {
                    toastr.success("Login successful")
                    this.loading = false;
                    localStorage.setItem("token", response.data);
                    this.axios.defaults.headers['auth-token'] = response.data;
                    this.$router.push('/')
                }).catch(err => {
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
