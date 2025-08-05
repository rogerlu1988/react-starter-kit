import{w as Y,a as q}from"./with-props-CzSI8F6l.js";import{p as i,q as N,s as D,a as c,o as a,M as V,L as J,S as W,t as H,O as z,v as Q}from"./chunk-DQRVZFIR-CVQrgAzT.js";import{C as G,a as X}from"./use_queries-B9NbwxMJ.js";import{C as k}from"./index-B0u-20DM.js";import{u as Z}from"./chunk-T2VIWQBM-TIbrgF64.js";import"./index-Bo2edEgN.js";import"./index-C-moV2d0.js";var d=e=>`🔒 Clerk: ${e.trim()}

For more info, check out the docs: https://clerk.com/docs,
or come say hi in our discord server: https://clerk.com/discord
`,y=`Use 'rootAuthLoader' as your root loader. Then, add <ClerkProvider> to your app.
Example:

import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args)
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider loaderData={loaderData}>
      <Outlet />
    </ClerkProvider>
  )
}
`,ee=d(`
You're trying to pass an invalid object in "<ClerkProvider clerkState={...}>".

${y}
`),w=d(`
Looks like you didn't pass 'clerkState' to "<ClerkProvider clerkState={...}>".

${y}
`);d(`
You're calling 'getAuth()' from a loader, without providing the loader args object.
Example:

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args)

  // Your code here
}
`);d(`
You're returning an invalid response from the 'rootAuthLoader' inside root.tsx.
You can only return plain objects, Responses created using the React Router 'data()'helper or
custom redirect 'Response' instances (status codes in the range of 300 to 400).
If you want to return a primitive value or an array, you can always wrap the response with an object.

Example:

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args, async ({ auth }) => {
    const { userId } = auth;
    const posts = await database.getPostsByUserId(userId);

    return { data: posts }
    // Or
    return data(posts, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
}
`);d(`
A secretKey must be provided in order to use SSR and the exports from @clerk/react-router/api.');
If your runtime supports environment variables, you can add a CLERK_SECRET_KEY variable to your config.
Otherwise, you can pass a secretKey parameter to rootAuthLoader or getAuth.
`);d("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");d(`
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL.`);var te=d(`
You're trying to use Clerk in React Router SPA Mode without providing a Publishable Key.
Please provide the publishableKey prop on the <ClerkProvider> component.

Example:

<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
`);function re(e){(!e||!e.__internal_clerk_state)&&console.warn(w)}function ne(e){if(!e)throw new Error(w);if(e&&!e.__internal_clerk_state)throw new Error(ee)}function oe(e){if(!e||typeof e!="string")throw new Error(te)}var b=()=>{var e;if(typeof window<"u"&&typeof((e=window.__reactRouterContext)==null?void 0:e.isSpaMode)<"u")return window.__reactRouterContext.isSpaMode},S=i.createContext(void 0);S.displayName="ClerkReactRouterOptionsCtx";var ae=e=>{const{children:r,options:n}=e;return i.createElement(S.Provider,{value:{value:n}},r)},ie=()=>{const e=N(),r=D(),n=i.useRef([]),t=()=>{n.current.forEach(o=>o()),n.current.splice(0,n.current.length)};return i.useEffect(()=>{t()},[r]),(o,l)=>new Promise(s=>{n.current.push(s),e(o,l)})},se={name:"@clerk/react-router",version:"1.4.8"},p={current:void 0};function le({children:e,...r}){const n=ie(),t=b();i.useEffect(()=>{p.current=n},[n]);const{clerkState:o,...l}=r;k.displayName="ReactClerkProvider",typeof t<"u"&&!t&&ne(o);const{__clerk_ssr_state:s,__publishableKey:u,__proxyUrl:h,__domain:C,__isSatellite:A,__clerk_debug:R,__signInUrl:P,__signUpUrl:U,__afterSignInUrl:j,__afterSignUpUrl:L,__signInForceRedirectUrl:I,__signUpForceRedirectUrl:M,__signInFallbackRedirectUrl:F,__signUpFallbackRedirectUrl:T,__clerkJSUrl:K,__clerkJSVersion:B,__telemetryDisabled:$,__telemetryDebug:O}=(o==null?void 0:o.__internal_clerk_state)||{};i.useEffect(()=>{typeof t<"u"&&!t&&re(o)},[]),i.useEffect(()=>{window.__clerk_debug=R},[]);const g={publishableKey:u,proxyUrl:h,domain:C,isSatellite:A,signInUrl:P,signUpUrl:U,afterSignInUrl:j,afterSignUpUrl:L,signInForceRedirectUrl:I,signUpForceRedirectUrl:M,signInFallbackRedirectUrl:F,signUpFallbackRedirectUrl:T,clerkJSUrl:K,clerkJSVersion:B,telemetry:{disabled:$,debug:O}};return i.createElement(ae,{options:g},i.createElement(k,{routerPush:v=>{var f;return(f=p.current)==null?void 0:f.call(p,v)},routerReplace:v=>{var f;return(f=p.current)==null?void 0:f.call(p,v,{replace:!0})},initialState:s,sdkMetadata:se,...g,...l},e))}var ce=({children:e,loaderData:r,...n})=>{let t;const o=b();return!o&&(r!=null&&r.clerkState)&&(t=r.clerkState),typeof o<"u"&&o&&oe(n.publishableKey),i.createElement(le,{...n,clerkState:t},e)};const ue=c.createContext(void 0);function de({children:e,client:r,useAuth:n}){const{isLoading:t,isAuthenticated:o,fetchAccessToken:l}=n(),[s,u]=c.useState(null);return t&&s!==null&&u(null),!t&&!o&&s!==!1&&u(!1),i.createElement(ue.Provider,{value:{isLoading:s===null,isAuthenticated:o&&(s??!1)}},i.createElement(fe,{authProviderAuthenticated:o,fetchAccessToken:l,authProviderLoading:t,client:r,setIsConvexAuthenticated:u}),i.createElement(G,{client:r},e),i.createElement(pe,{authProviderAuthenticated:o,fetchAccessToken:l,authProviderLoading:t,client:r,setIsConvexAuthenticated:u}))}function fe({authProviderAuthenticated:e,fetchAccessToken:r,authProviderLoading:n,client:t,setIsConvexAuthenticated:o}){return c.useEffect(()=>{let l=!0;if(e)return t.setAuth(r,s=>{l&&o(()=>s)}),()=>{l=!1,o(s=>s?!1:null)}},[e,r,n,t,o]),null}function pe({authProviderAuthenticated:e,fetchAccessToken:r,authProviderLoading:n,client:t,setIsConvexAuthenticated:o}){return c.useEffect(()=>{if(e)return()=>{t.clearAuth(),o(()=>null)}},[e,r,n,t,o]),null}function he({children:e,client:r,useAuth:n}){const t=ve(n);return i.createElement(de,{client:r,useAuth:t},e)}function ve(e){return c.useMemo(()=>function(){const{isLoaded:n,isSignedIn:t,getToken:o,orgId:l,orgRole:s}=e(),u=c.useCallback(async({forceRefreshToken:h})=>{try{return o({template:"convex",skipCache:h})}catch{return null}},[l,s]);return c.useMemo(()=>({isLoading:!n,isAuthenticated:t??!1,fetchAccessToken:u}),[n,t,u])},[e])}var _={},me="@vercel/analytics",ge="1.5.0",ke=()=>{window.va||(window.va=function(...r){(window.vaq=window.vaq||[]).push(r)})};function x(){return typeof window<"u"}function E(){try{const e="production"}catch{}return"production"}function _e(e="auto"){if(e==="auto"){window.vam=E();return}window.vam=e}function ye(){return(x()?window.vam:E())||"production"}function m(){return ye()==="development"}function we(e){return e.scriptSrc?e.scriptSrc:m()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?`${e.basePath}/insights/script.js`:"/_vercel/insights/script.js"}function be(e={debug:!0}){var r;if(!x())return;_e(e.mode),ke(),e.beforeSend&&((r=window.va)==null||r.call(window,"beforeSend",e.beforeSend));const n=we(e);if(document.head.querySelector(`script[src*="${n}"]`))return;const t=document.createElement("script");t.src=n,t.defer=!0,t.dataset.sdkn=me+(e.framework?`/${e.framework}`:""),t.dataset.sdkv=ge,e.disableAutoTrack&&(t.dataset.disableAutoTrack="1"),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(t.dataset.dsn=e.dsn),t.onerror=()=>{const o=m()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${o}`)},m()&&e.debug===!1&&(t.dataset.debug="false"),document.head.appendChild(t)}function Se({route:e,path:r}){var n;(n=window.va)==null||n.call(window,"pageview",{route:e,path:r})}function xe(){if(!(typeof process>"u"||typeof _>"u"))return _.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}function Ee(e){return c.useEffect(()=>{var r;e.beforeSend&&((r=window.va)==null||r.call(window,"beforeSend",e.beforeSend))},[e.beforeSend]),c.useEffect(()=>{be({framework:e.framework||"react",basePath:e.basePath??xe(),...e.route!==void 0&&{disableAutoTrack:!0},...e})},[]),c.useEffect(()=>{e.route&&e.path&&Se({route:e.route,path:e.path})},[e.route,e.path]),null}const Ce=new X("https://example-convex.convex.cloud"),Me=()=>[{rel:"dns-prefetch",href:"https://fonts.googleapis.com"},{rel:"dns-prefetch",href:"https://fonts.gstatic.com"},{rel:"dns-prefetch",href:"https://api.convex.dev"},{rel:"dns-prefetch",href:"https://clerk.dev"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"preload",href:"/rsk.png",as:"image",type:"image/png"},{rel:"preload",href:"/favicon.png",as:"image",type:"image/png"},{rel:"icon",type:"image/png",href:"/favicon.png"}];function Fe({children:e}){return a.jsxs("html",{lang:"en",children:[a.jsxs("head",{children:[a.jsx("meta",{charSet:"utf-8"}),a.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),a.jsx(V,{}),a.jsx(J,{})]}),a.jsxs("body",{children:[a.jsx(Ee,{}),e,a.jsx(W,{}),a.jsx(H,{})]})]})}const Te=Y(function({loaderData:r}){return a.jsx(ce,{loaderData:r,signUpFallbackRedirectUrl:"/",signInFallbackRedirectUrl:"/",children:a.jsx(he,{client:Ce,useAuth:Z,children:a.jsx(z,{})})})}),Ke=q(function({error:r}){let n="Oops!",t="An unexpected error occurred.",o;return Q(r)&&(n=r.status===404?"404":"Error",t=r.status===404?"The requested page could not be found.":r.statusText||t),a.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[a.jsx("h1",{children:n}),a.jsx("p",{children:t}),o]})});export{Ke as ErrorBoundary,Fe as Layout,Te as default,Me as links};
