(()=>{"use strict";var e=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};const t="http://localhost:3000/";function n(n,o,r){return e(this,void 0,void 0,(function*(){try{const e=yield fetch(`${t}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:o?JSON.stringify(o):void 0});return e.ok?{success:!0,data:yield e.json()}:{success:!1,error:yield e.json()}}catch(e){return console.error("Error posting data to API",e),{success:!1,error:{message:`An error occurred while connecting to the API: ${e.message||"Unknown error"}`}}}}))}function o(n){return o=this,r=void 0,c=function*(){return yield function(n,o){return e(this,void 0,void 0,(function*(){try{const e=yield fetch(`${t}user`,{headers:{Authorization:`Bearer ${o}`}});return e.ok?{success:!0,data:yield e.json()}:{success:!1,error:yield e.json()}}catch(e){return console.error("Error fetching data from API",e),{success:!1,error:{message:"An error occurred while fetching data."}}}}))}(0,n)},new((i=void 0)||(i=Promise))((function(e,t){function n(e){try{s(c.next(e))}catch(e){t(e)}}function a(e){try{s(c.throw(e))}catch(e){t(e)}}function s(t){var o;t.done?e(t.value):(o=t.value,o instanceof i?o:new i((function(e){e(o)}))).then(n,a)}s((c=c.apply(o,r||[])).next())}));var o,r,i,c}var r=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};const i=(e="token")=>{return t=void 0,o=void 0,c=function*(){const t=localStorage[e];if(t)try{const e=yield function(e,t="auth/validate"){return r(this,void 0,void 0,(function*(){const o={token:e};return yield n(t,o)}))}(t);return!0===e.success?!0===(yield e.data).valid:(console.error("Error validating token:",e.error),!1)}catch(e){return console.error("Error validating token:",e),!1}return!1},new((i=void 0)||(i=Promise))((function(e,n){function r(e){try{s(c.next(e))}catch(e){n(e)}}function a(e){try{s(c.throw(e))}catch(e){n(e)}}function s(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,a)}s((c=c.apply(t,o||[])).next())}));var t,o,i,c};var c=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};const a=(e,t,n)=>{const o=document.createElement("a");return o.classList.add("block","px-4","py-2","text-sm","text-gray-700"),o.setAttribute("href",t),o.setAttribute("role","menuitem"),o.setAttribute("tabindex","-1"),o.setAttribute("id",n),o.innerText=e,o},s=()=>c(void 0,void 0,void 0,(function*(){const e=localStorage.getItem("token"),t=yield o(e);if(t.success){const e=t.data;if(e&&"admin"===e.role)return!0}return!1})),u=()=>c(void 0,void 0,void 0,(function*(){localStorage.removeItem("token"),window.location.href="/account/login.html"}));function d(e){return{isValid:e.length>2,error:"Name must be at least 2 characters"}}function l(e){e.innerHTML=""}document.addEventListener("DOMContentLoaded",(()=>{c(void 0,void 0,void 0,(function*(){const e=document.querySelector("#user-menu-list");if(e)if(e.innerHTML="",yield i()){const t=window.location.pathname.includes("login.html"),n=window.location.pathname.includes("signup.html");let o;o=(yield s())?"/admin":"/user",(t||n)&&(window.location.href=o),e.appendChild(a("Your Dashboard",o,"user-menu-item-0")),e.appendChild(a("Logout","account/login.html","user-menu-item-2"));const r=document.querySelector("#user-menu-item-2");r&&r.addEventListener("click",(e=>{e.preventDefault(),u()}))}else document.querySelectorAll(".login-required").forEach((e=>{e.setAttribute("href","/account/login.html")})),e.appendChild(a("Sign In","/account/login.html","user-menu-item-0")),e.appendChild(a("Create Account","/account/signup.html","user-menu-item-1"))})),(()=>{const e=document.querySelector("#user-menu"),t=document.querySelector("#user-menu-list");e&&t&&e.addEventListener("click",(()=>{t.classList.toggle("hidden")}));const n=document.querySelector("#mobile-menu"),o=document.querySelector("#menu-toggle"),r=document.querySelector("#menu-close-btn"),i=document.querySelector("#menu-show-btn");o&&n&&r&&i&&o.addEventListener("click",(()=>{n.classList.toggle("hidden"),r.classList.toggle("hidden"),i.classList.toggle("hidden")}))})();const e=document.querySelector("#registrationForm");e&&e.addEventListener("submit",(e=>{return t=void 0,o=void 0,c=function*(){if(e.preventDefault(),function(){var e,t,n,o;const r=document.querySelector("#firstName"),i=document.querySelector("#lastName"),c=document.querySelector("#email"),a=document.querySelector("#password"),s=d(r.value),u=d(i.value),l=function(e){return{isValid:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e),error:"Invalid email address"}}(c.value),m=function(e){return{isValid:e.length>6,error:"Password must be at least 6 characters"}}(a.value);return!!(s.isValid&&u.isValid&&l.isValid&&m.isValid)||(s.isValid||(r.classList.add("border","border-red-500"),null===(e=r.nextElementSibling)||void 0===e||e.classList.remove("hidden")),u.isValid||(i.classList.add("border","border-red-500"),null===(t=i.nextElementSibling)||void 0===t||t.classList.remove("hidden")),l.isValid||(c.classList.add("border","border-red-500"),null===(n=c.nextElementSibling)||void 0===n||n.classList.remove("hidden")),m.isValid||(a.classList.add("border","border-red-500"),null===(o=a.nextElementSibling)||void 0===o||o.classList.remove("hidden")),!1)}()){const e=document.querySelector("#firstName"),o=document.querySelector("#lastName"),i=document.querySelector("#email"),c=document.querySelector("#password"),a={firstName:e.value,lastName:o.value,email:i.value,password:c.value},s=yield function(e,t="auth/signup"){return r(this,void 0,void 0,(function*(){return yield n(t,e)}))}(a);if(s.success){const{access_token:e}=s.data;localStorage.setItem("token",e),(t=document.querySelector("#errorContainer")).innerHTML='<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">\n    <p class="font-bold">Success</p>\n    <p>You have successfully registered. You will be redirected to your dashboard in 3 seconds.</p>\n  </div>',setTimeout((()=>l(t)),3e3),"admin"===s.data.user.role?setTimeout((()=>{window.location.href="/admin"}),3e3):setTimeout((()=>{window.location.href="/user"}),3e3)}else{const e=s.error.message,t=document.querySelector("#errorContainer");t&&function(e,t,n){e.innerHTML=`<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">\n    <p class="font-bold">Error</p>\n    <p>${t}</p>\n  </div>`,setTimeout((()=>l(e)),3e3)}(t,e)}}var t},new((i=void 0)||(i=Promise))((function(e,n){function r(e){try{s(c.next(e))}catch(e){n(e)}}function a(e){try{s(c.throw(e))}catch(e){n(e)}}function s(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,a)}s((c=c.apply(t,o||[])).next())}));var t,o,i,c}))}))})();