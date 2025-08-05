import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, useLocation, redirect } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createElement, useCallback, memo, useState, useEffect, useMemo } from "react";
import { ClerkProvider, useAuth, UserButton, SignIn, SignUp, useClerk } from "@clerk/react-router";
import { rootAuthLoader, getAuth } from "@clerk/react-router/ssr.server";
import { ConvexReactClient, useQuery, useAction, useMutation } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Analytics } from "@vercel/analytics/react";
import { fetchQuery, fetchAction } from "convex/nextjs";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRight, Menu, X, Github, Loader2, Check, CheckCircle, ArrowRight, Lock, CreditCard, XIcon, PanelLeftIcon, SettingsIcon, MessageCircle, ChevronDownIcon, CheckIcon, ChevronUpIcon, Calendar, ExternalLink } from "lucide-react";
import { componentsGeneric, anyApi } from "convex/server";
import { IconDotsVertical, IconUserCircle, IconLogout, IconDashboard, IconSettings, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { createClerkClient } from "@clerk/react-router/api.server";
import * as RechartsPrimitive from "recharts";
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const convex = new ConvexReactClient("https://example-convex.convex.cloud");
async function loader$2(args) {
  return rootAuthLoader(args);
}
const links = () => [
  // DNS prefetch for external services
  {
    rel: "dns-prefetch",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "dns-prefetch",
    href: "https://fonts.gstatic.com"
  },
  {
    rel: "dns-prefetch",
    href: "https://api.convex.dev"
  },
  {
    rel: "dns-prefetch",
    href: "https://clerk.dev"
  },
  // Preconnect to font services
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  // Font with display=swap for performance
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  // Preload critical assets
  {
    rel: "preload",
    href: "/rsk.png",
    as: "image",
    type: "image/png"
  },
  {
    rel: "preload",
    href: "/favicon.png",
    as: "image",
    type: "image/png"
  },
  // Icon
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png"
  }
];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Analytics, {}), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App({
  loaderData
}) {
  return /* @__PURE__ */ jsx(ClerkProvider, {
    loaderData,
    signUpFallbackRedirectUrl: "/",
    signInFallbackRedirectUrl: "/",
    children: /* @__PURE__ */ jsx(ConvexProviderWithClerk, {
      client: convex,
      useAuth,
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function ContentSection() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-16 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 md:gap-12", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-medium", children: "The Starter Kit you need to start your SaaS application." }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Stop rebuilding the same foundation over and over. RSK eliminates months of integration work by providing a complete, production-ready SaaS template with authentication, payments, and real-time data working seamlessly out of the box.",
        " "
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "From idea to launch in weeks," }),
        " ",
        "not months. With TypeScript safety, modern UI components, and scalable architecture built-in, you can validate your business concept and start generating revenue while your competitors are still setting up their development environment.",
        " "
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "secondary",
          size: "sm",
          className: "gap-1 pr-1.5",
          children: /* @__PURE__ */ jsxs(Link, { to: "#", children: [
            /* @__PURE__ */ jsx("span", { children: "Learn More" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "size-2" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
function FooterSection() {
  return /* @__PURE__ */ jsx("footer", { className: "py-16 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-6", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "go home", className: "mx-auto block size-fit", children: /* @__PURE__ */ jsx("img", { src: "/rsk.png", alt: "RSK Logo", className: "h-12 w-12" }) }),
    /* @__PURE__ */ jsx("div", { className: "my-8 flex flex-wrap justify-center gap-6 text-sm", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "https://x.com/rasmickyy",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "X/Twitter",
        className: "text-muted-foreground hover:text-primary block",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            width: "1em",
            height: "1em",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fill: "currentColor",
                d: "M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
              }
            )
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground block text-center text-sm", children: [
      " ",
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " RSK, All rights reserved"
    ] })
  ] }) });
}
const LogoIcon = ({
  className,
  uniColor
}) => {
  return /* @__PURE__ */ jsx("img", { src: "/rsk.png", className: "w-12 h-12" });
};
function ReactRouter(props) {
  return /* @__PURE__ */ jsxs("svg", { width: "94", height: "61", viewBox: "0 0 94 61", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M72.7315 20.9357C70.0548 20.0941 68.6725 20.3778 65.8649 20.071C61.5246 19.5976 59.7954 17.9013 59.0619 13.5356C58.6514 11.0985 59.1361 7.53022 58.0881 5.32106C56.0839 1.10875 51.3943 -0.780439 46.6828 0.297843C42.7049 1.20956 39.3951 5.18518 39.2117 9.266C39.0021 13.9254 41.657 17.901 46.2156 19.273C48.3814 19.9261 50.6825 20.2548 52.9444 20.4214C57.0925 20.7238 57.4113 23.0297 58.5335 24.9277C59.2409 26.1243 59.9264 27.3034 59.9264 30.8714C59.9264 34.4394 59.2365 35.6185 58.5335 36.8151C57.4113 38.7087 56.0271 39.9491 51.879 40.2559C49.6171 40.4225 47.3116 40.7513 45.1502 41.4044C40.5916 42.7807 37.9367 46.7519 38.1463 51.4113C38.3297 55.4921 41.6395 59.4678 45.6174 60.3795C50.3289 61.4621 55.0185 59.5686 57.0227 55.3563C58.075 53.1471 58.6514 50.6443 59.0619 48.2072C59.7998 43.8414 61.5289 42.1451 65.8649 41.6717C68.6725 41.3649 71.5783 41.6717 74.2093 40.177C76.9895 38.1456 79.4734 35.0968 79.4734 30.8714C79.4734 26.6459 76.7967 22.2156 72.7315 20.9357Z", fill: "#F44250" }),
    /* @__PURE__ */ jsx("path", { d: "M28.1997 40.7739C22.7285 40.7739 18.2656 36.3027 18.2656 30.8213C18.2656 25.3399 22.7285 20.8687 28.1997 20.8687C33.6709 20.8687 38.1338 25.3399 38.1338 30.8213C38.1338 36.2983 33.6665 40.7739 28.1997 40.7739Z", fill: "#121212" }),
    /* @__PURE__ */ jsx("path", { d: "M9.899 61C4.43661 60.9868 -0.0130938 56.498 2.89511e-05 51.0122C0.0132099 45.5353 4.4936 41.0773 9.96914 41.0948C15.4359 41.108 19.8856 45.5968 19.8681 51.0825C19.8549 56.5551 15.3745 61.0131 9.899 61Z", fill: "#121212" }),
    /* @__PURE__ */ jsx("path", { d: "M83.7137 60.9998C78.2339 61.0304 73.7361 56.5901 73.7052 51.122C73.6747 45.632 78.1068 41.1258 83.5646 41.0949C89.0444 41.0643 93.5423 45.5046 93.5731 50.9727C93.6036 56.4583 89.1716 60.9689 83.7137 60.9998Z", fill: "#121212" })
  ] });
}
function Convex(props) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "28 28 128 132", xmlns: "http://www.w3.org/2000/svg", fill: "none", children: [
    /* @__PURE__ */ jsx("path", { fill: "#F3B01C", d: "M108.092 130.021c18.166-2.018 35.293-11.698 44.723-27.854-4.466 39.961-48.162 65.218-83.83 49.711-3.286-1.425-6.115-3.796-8.056-6.844-8.016-12.586-10.65-28.601-6.865-43.135 10.817 18.668 32.81 30.111 54.028 28.122Z" }),
    /* @__PURE__ */ jsx("path", { fill: "#8D2676", d: "M53.401 90.174c-7.364 17.017-7.682 36.94 1.345 53.336-31.77-23.902-31.423-75.052-.388-98.715 2.87-2.187 6.282-3.485 9.86-3.683 14.713-.776 29.662 4.91 40.146 15.507-21.3.212-42.046 13.857-50.963 33.555Z" }),
    /* @__PURE__ */ jsx("path", { fill: "#EE342F", d: "M114.637 61.855C103.89 46.87 87.069 36.668 68.639 36.358c35.625-16.17 79.446 10.047 84.217 48.807.444 3.598-.139 7.267-1.734 10.512-6.656 13.518-18.998 24.002-33.42 27.882 10.567-19.599 9.263-43.544-3.065-61.704Z" })
  ] });
}
function ReactIcon(props) {
  return /* @__PURE__ */ jsx("svg", { width: "569px", height: "512px", viewBox: "0 0 569 512", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", children: /* @__PURE__ */ jsx("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ jsx("g", { transform: "translate(-227, -256)", fill: "#58C4DC", fillRule: "nonzero", children: /* @__PURE__ */ jsxs("g", { transform: "translate(227, 256)", children: [
    /* @__PURE__ */ jsx("path", { d: "M285.5,201 C255.400481,201 231,225.400481 231,255.5 C231,285.599519 255.400481,310 285.5,310 C315.599519,310 340,285.599519 340,255.5 C340,225.400481 315.599519,201 285.5,201", id: "Path" }),
    /* @__PURE__ */ jsx("path", { d: "M568.959856,255.99437 C568.959856,213.207656 529.337802,175.68144 466.251623,150.985214 C467.094645,145.423543 467.85738,139.922107 468.399323,134.521063 C474.621631,73.0415145 459.808523,28.6686204 426.709856,9.5541429 C389.677085,-11.8291748 337.36955,3.69129898 284.479928,46.0162134 C231.590306,3.69129898 179.282771,-11.8291748 142.25,9.5541429 C109.151333,28.6686204 94.3382249,73.0415145 100.560533,134.521063 C101.102476,139.922107 101.845139,145.443621 102.708233,151.02537 C97.4493791,153.033193 92.2908847,155.161486 87.3331099,157.39017 C31.0111824,182.708821 0,217.765415 0,255.99437 C0,298.781084 39.6220545,336.307301 102.708233,361.003527 C101.845139,366.565197 101.102476,372.066633 100.560533,377.467678 C94.3382249,438.947226 109.151333,483.32012 142.25,502.434597 C153.629683,508.887578 166.52439,512.186771 179.603923,511.991836 C210.956328,511.991836 247.567589,495.487529 284.479928,465.972527 C321.372196,495.487529 358.003528,511.991836 389.396077,511.991836 C402.475265,512.183856 415.36922,508.884856 426.75,502.434597 C459.848667,483.32012 474.661775,438.947226 468.439467,377.467678 C467.897524,372.066633 467.134789,366.565197 466.291767,361.003527 C529.377946,336.347457 569,298.761006 569,255.99437 M389.155214,27.1025182 C397.565154,26.899606 405.877839,28.9368502 413.241569,33.0055186 C436.223966,46.2772304 446.540955,82.2775015 441.522965,131.770345 C441.181741,135.143488 440.780302,138.556788 440.298575,141.990165 C414.066922,134.08804 387.205771,128.452154 360.010724,125.144528 C343.525021,103.224055 325.192524,82.7564475 305.214266,63.9661533 C336.586743,39.7116483 366.032313,27.1025182 389.135142,27.1025182 M378.356498,310.205598 C368.204912,327.830733 357.150626,344.919965 345.237759,361.405091 C325.045049,363.479997 304.758818,364.51205 284.459856,364.497299 C264.167589,364.51136 243.888075,363.479308 223.702025,361.405091 C211.820914,344.919381 200.80007,327.83006 190.683646,310.205598 C180.532593,292.629285 171.306974,274.534187 163.044553,255.99437 C171.306974,237.454554 180.532593,219.359455 190.683646,201.783142 C200.784121,184.229367 211.770999,167.201087 223.601665,150.764353 C243.824636,148.63809 264.145559,147.579168 284.479928,147.591877 C304.772146,147.579725 325.051559,148.611772 345.237759,150.68404 C357.109048,167.14607 368.136094,184.201112 378.27621,201.783142 C388.419418,219.363718 397.644825,237.458403 405.915303,255.99437 C397.644825,274.530337 388.419418,292.625022 378.27621,310.205598 M419.724813,290.127366 C426.09516,307.503536 431.324985,325.277083 435.380944,343.334682 C417.779633,348.823635 399.836793,353.149774 381.668372,356.285142 C388.573127,345.871232 395.263781,335.035679 401.740334,323.778483 C408.143291,312.655143 414.144807,301.431411 419.805101,290.207679 M246.363271,390.377981 C258.848032,391.140954 271.593728,391.582675 284.5,391.582675 C297.406272,391.582675 310.232256,391.140954 322.737089,390.377981 C310.880643,404.583418 298.10766,417.997563 284.5,430.534446 C270.921643,417.999548 258.18192,404.585125 246.363271,390.377981 Z M187.311556,356.244986 C169.137286,353.123646 151.187726,348.810918 133.578912,343.334682 C137.618549,325.305649 142.828222,307.559058 149.174827,290.207679 C154.754833,301.431411 160.736278,312.655143 167.239594,323.778483 C173.74291,334.901824 180.467017,345.864539 187.311556,356.285142 M149.174827,221.760984 C142.850954,204.473938 137.654787,186.794745 133.619056,168.834762 C151.18418,163.352378 169.085653,159.013101 187.211197,155.844146 C180.346585,166.224592 173.622478,176.986525 167.139234,188.210257 C160.65599,199.433989 154.734761,210.517173 149.074467,221.760984 M322.616657,121.590681 C310.131896,120.827708 297.3862,120.385987 284.379568,120.385987 C271.479987,120.385987 258.767744,120.787552 246.242839,121.590681 C258.061488,107.383537 270.801211,93.9691137 284.379568,81.4342157 C297.99241,93.9658277 310.765727,107.380324 322.616657,121.590681 Z M401.70019,188.210257 C395.196875,176.939676 388.472767,166.09743 381.527868,155.68352 C399.744224,158.819049 417.734224,163.151949 435.380944,168.654058 C431.331963,186.680673 426.122466,204.426664 419.785029,221.781062 C414.205023,210.55733 408.203506,199.333598 401.720262,188.230335 M127.517179,131.790423 C122.438973,82.3176579 132.816178,46.2973086 155.778503,33.0255968 C163.144699,28.9632474 171.455651,26.9264282 179.864858,27.1225964 C202.967687,27.1225964 232.413257,39.7317265 263.785734,63.9862316 C243.794133,82.7898734 225.448298,103.270812 208.949132,125.204763 C181.761691,128.528025 154.90355,134.14313 128.661281,141.990165 C128.199626,138.556788 127.778115,135.163566 127.456963,131.790423 M98.4529773,182.106474 C101.54406,180.767925 104.695358,179.429376 107.906872,178.090828 C114.220532,204.735668 122.781793,230.7969 133.498624,255.99437 C122.761529,281.241316 114.193296,307.357063 107.8868,334.058539 C56.7434387,313.076786 27.0971497,284.003505 27.0971497,255.99437 C27.0971497,229.450947 53.1907013,202.526037 98.4529773,182.106474 Z M155.778503,478.963143 C132.816178,465.691432 122.438973,429.671082 127.517179,380.198317 C127.838331,376.825174 128.259842,373.431953 128.721497,369.978497 C154.953686,377.878517 181.814655,383.514365 209.009348,386.824134 C225.500295,408.752719 243.832321,429.233234 263.805806,448.042665 C220.069,481.834331 180.105722,492.97775 155.838719,478.963143 M441.502893,380.198317 C446.520883,429.691161 436.203894,465.691432 413.221497,478.963143 C388.974566,493.017906 348.991216,481.834331 305.274481,448.042665 C325.241364,429.232737 343.566681,408.752215 360.050868,386.824134 C387.245915,383.516508 414.107066,377.880622 440.338719,369.978497 C440.820446,373.431953 441.221885,376.825174 441.563109,380.198317 M461.193488,334.018382 C454.869166,307.332523 446.294494,281.231049 435.561592,255.99437 C446.289797,230.744081 454.857778,204.629101 461.173416,177.930202 C512.216417,198.911955 541.942994,227.985236 541.942994,255.99437 C541.942994,284.003505 512.296705,313.076786 461.153344,334.058539", id: "Shape" })
  ] }) }) }) });
}
function TailwindIcon(props) {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 54 33", children: [
    /* @__PURE__ */ jsx("g", { clipPath: "url(#a)", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#38bdf8",
        fillRule: "evenodd",
        d: "M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z",
        clipRule: "evenodd"
      }
    ) }),
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "a", children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M0 0h54v32.4H0z" }) }) })
  ] });
}
function TypeScript(props) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: "256", height: "256", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid", children: [
    /* @__PURE__ */ jsx("path", { d: "M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z", fill: "#3178C6" }),
    /* @__PURE__ */ jsx("path", { d: "M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z", fill: "#FFF" })
  ] });
}
function Polar() {
  return /* @__PURE__ */ jsx("img", { src: "/polar.svg", alt: "Polar Logo" });
}
const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "Team", href: "#team" },
  { name: "Pricing", href: "#pricing" }
];
const Navbar = ({
  loaderData
}) => {
  const [menuState, setMenuState] = React__default.useState(false);
  const [isScrolled, setIsScrolled] = React__default.useState(false);
  React__default.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = useCallback((href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
    setMenuState(false);
  }, []);
  const dashboardLink = !(loaderData == null ? void 0 : loaderData.isSignedIn) ? "/sign-up" : loaderData.hasActiveSubscription ? "/dashboard" : "/pricing";
  const dashboardText = !(loaderData == null ? void 0 : loaderData.isSignedIn) ? "Get Started (Demo)" : loaderData.hasActiveSubscription ? "Dashboard" : "Subscribe";
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(
    "nav",
    {
      "data-state": menuState && "active",
      className: "fixed z-99 w-full px-2",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-between lg:w-auto", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/",
                  "aria-label": "home",
                  className: "flex items-center space-x-2 font-semibold text-xl",
                  prefetch: "viewport",
                  children: /* @__PURE__ */ jsx("img", { src: "/rsk.png", alt: "RSK Logo", className: "h-12 w-12" })
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setMenuState(!menuState),
                  "aria-label": menuState == true ? "Close Menu" : "Open Menu",
                  className: "relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden",
                  children: [
                    /* @__PURE__ */ jsx(Menu, { className: "in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" }),
                    /* @__PURE__ */ jsx(X, { className: "in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 m-auto hidden size-fit lg:block", children: /* @__PURE__ */ jsx("ul", { className: "flex gap-8 text-sm", children: menuItems.map((item, index2) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => handleNavClick(item.href),
                className: "hover:cursor-pointer text-muted-foreground block duration-150 transition-colors",
                children: /* @__PURE__ */ jsx("span", { children: item.name })
              }
            ) }, index2)) }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent", children: [
              /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx("ul", { className: "space-y-6 text-base", children: menuItems.map((item, index2) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleNavClick(item.href),
                  className: "text-muted-foreground hover:cursor-pointer  block duration-150 transition-colors w-full text-left",
                  children: /* @__PURE__ */ jsx("span", { children: item.name })
                }
              ) }, index2)) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "https://github.com/michaelshimeles/react-starter-kit",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center justify-center",
                    children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" })
                  }
                ),
                (loaderData == null ? void 0 : loaderData.isSignedIn) ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsx(Link, { to: dashboardLink, prefetch: "viewport", children: /* @__PURE__ */ jsx("span", { children: dashboardText }) }) }),
                  /* @__PURE__ */ jsx(UserButton, {})
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      asChild: true,
                      variant: "outline",
                      size: "sm",
                      className: cn(isScrolled && "lg:hidden"),
                      children: /* @__PURE__ */ jsx(Link, { to: "/sign-in", prefetch: "viewport", children: /* @__PURE__ */ jsx("span", { children: "Login" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      asChild: true,
                      size: "sm",
                      className: cn(isScrolled && "lg:hidden"),
                      children: /* @__PURE__ */ jsx(Link, { to: "/sign-up", prefetch: "viewport", children: /* @__PURE__ */ jsx("span", { children: "Sign Up" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      asChild: true,
                      size: "sm",
                      className: cn(isScrolled ? "lg:inline-flex" : "hidden"),
                      children: /* @__PURE__ */ jsx(Link, { to: "/sign-up", prefetch: "viewport", children: /* @__PURE__ */ jsx("span", { children: dashboardText }) })
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  ) });
};
function IntegrationsSection({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("section", { id: "hero", children: [
    /* @__PURE__ */ jsx(Navbar, { loaderData }),
    /* @__PURE__ */ jsx("div", { className: "bg-muted dark:bg-background py-24 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-6 mt-[2rem]", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "dark:bg-muted/50 relative mx-auto w-fit", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-radial to-muted dark:to-background absolute inset-0 z-10 from-transparent to-75%" }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-2 flex w-fit justify-center gap-2", children: [
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(ReactRouter, {}) }),
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(Convex, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto my-2 flex w-fit justify-center gap-2", children: [
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(ReactIcon, {}) }),
          /* @__PURE__ */ jsx(
            IntegrationCard,
            {
              borderClassName: "shadow-black-950/10 shadow-xl border-black/25 dark:border-white/25",
              className: "dark:bg-white/10",
              children: /* @__PURE__ */ jsx(LogoIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(TailwindIcon, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-fit justify-center gap-2", children: [
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(TypeScript, {}) }),
          /* @__PURE__ */ jsx(IntegrationCard, { children: /* @__PURE__ */ jsx(Polar, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-balance text-3xl font-semibold md:text-4xl", children: "React Starter Kit" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "This powerful starter kit is designed to help you launch your SAAS application quickly and efficiently." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: (loaderData == null ? void 0 : loaderData.isSignedIn) ? (loaderData == null ? void 0 : loaderData.hasActiveSubscription) ? "/dashboard" : "/pricing" : "/sign-up",
              prefetch: "viewport",
              children: (loaderData == null ? void 0 : loaderData.isSignedIn) ? (loaderData == null ? void 0 : loaderData.hasActiveSubscription) ? "Go to Dashboard (Demo)" : "Subscribe Now (Demo)" : "Get Started (Demo)"
            }
          ) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "https://github.com/michaelshimeles/react-starter-kit",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "⭐️ Start on GitHub"
            }
          ) })
        ] })
      ] })
    ] }) }) })
  ] });
}
const IntegrationCard = memo(({
  children,
  className,
  borderClassName
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "bg-background relative flex size-20 rounded-xl dark:bg-transparent",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            role: "presentation",
            className: cn(
              "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25",
              borderClassName
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-20 m-auto size-fit *:size-8", children })
      ]
    }
  );
});
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
const api = anyApi;
componentsGeneric();
function Pricing({ loaderData }) {
  var _a;
  const { isSignedIn } = useAuth();
  const [loadingPriceId, setLoadingPriceId] = useState(null);
  const [error, setError] = useState(null);
  const userSubscription = useQuery(api.subscriptions.fetchUserSubscription);
  const createCheckout = useAction(api.subscriptions.createCheckoutSession);
  const createPortalUrl = useAction(api.subscriptions.createCustomerPortalUrl);
  const upsertUser = useMutation(api.users.upsertUser);
  const handleSubscribe = async (priceId) => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }
    setLoadingPriceId(priceId);
    setError(null);
    try {
      await upsertUser();
      if ((userSubscription == null ? void 0 : userSubscription.status) === "active" && (userSubscription == null ? void 0 : userSubscription.customerId)) {
        const portalResult = await createPortalUrl({
          customerId: userSubscription.customerId
        });
        window.open(portalResult.url, "_blank");
        setLoadingPriceId(null);
        return;
      }
      const checkoutUrl = await createCheckout({ priceId });
      window.location.href = checkoutUrl;
    } catch (error2) {
      console.error("Failed to process subscription action:", error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Failed to process request. Please try again.";
      setError(errorMessage);
      setLoadingPriceId(null);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "pricing", className: "py-16 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-4xl font-semibold lg:text-5xl", children: "Pricing that Scales with You" }),
      /* @__PURE__ */ jsx("p", { children: "Choose the plan that fits your needs. All plans include full access to our platform." })
    ] }),
    !(loaderData == null ? void 0 : loaderData.plans) ? /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
        /* @__PURE__ */ jsx("span", { children: "Loading plans..." })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mt-4 text-center", children: error })
    ] }) : /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 md:mt-20 md:grid-cols-3", children: loaderData.plans.items.sort((a, b) => {
      const priceComparison = a.prices[0].amount - b.prices[0].amount;
      return priceComparison !== 0 ? priceComparison : a.name.localeCompare(b.name);
    }).map((plan, index2) => {
      const isPopular = loaderData.plans.items.length === 2 ? index2 === 1 : index2 === Math.floor(loaderData.plans.items.length / 2);
      const price = plan.prices[0];
      const isCurrentPlan = (userSubscription == null ? void 0 : userSubscription.status) === "active" && (userSubscription == null ? void 0 : userSubscription.amount) === price.amount;
      return /* @__PURE__ */ jsxs(
        Card,
        {
          className: `relative ${isPopular ? "border-primary" : ""} ${isCurrentPlan ? "border-green-500 bg-green-50/50" : ""}`,
          children: [
            isPopular && !isCurrentPlan && /* @__PURE__ */ jsx("span", { className: "bg-primary text-primary-foreground absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full px-3 py-1 text-xs font-medium", children: "Popular" }),
            isCurrentPlan && /* @__PURE__ */ jsx("span", { className: "bg-green-500 text-white absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full px-3 py-1 text-xs font-medium", children: "Current Plan" }),
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "font-medium", children: plan.name }),
              /* @__PURE__ */ jsxs("span", { className: "my-3 block text-2xl font-semibold", children: [
                "$",
                (price.amount / 100).toFixed(0),
                " /",
                " ",
                price.interval || "mo"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { className: "text-sm", children: plan.description }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  className: "mt-4 w-full",
                  variant: isCurrentPlan ? "secondary" : isPopular ? "default" : "outline",
                  onClick: () => handleSubscribe(price.id),
                  disabled: loadingPriceId === price.id,
                  children: loadingPriceId === price.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Setting up checkout..."
                  ] }) : isCurrentPlan ? "✓ Current Plan" : (userSubscription == null ? void 0 : userSubscription.status) === "active" ? (() => {
                    const currentAmount = userSubscription.amount || 0;
                    const newAmount = price.amount;
                    if (newAmount > currentAmount) {
                      return `Upgrade (+$${((newAmount - currentAmount) / 100).toFixed(0)}/mo)`;
                    } else if (newAmount < currentAmount) {
                      return `Downgrade (-$${((currentAmount - newAmount) / 100).toFixed(0)}/mo)`;
                    } else {
                      return "Manage Plan";
                    }
                  })() : "Get Started (Demo)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("hr", { className: "border-dashed" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-outside space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                  "All features included"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                  "Priority support"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                  "Cancel anytime"
                ] }),
                plan.isRecurring && /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                  "Recurring billing"
                ] })
              ] })
            ] })
          ]
        },
        plan.id
      );
    }) }),
    error && /* @__PURE__ */ jsx("div", { className: "mt-8 p-4 bg-red-50 border border-red-200 rounded-md max-w-md mx-auto", children: /* @__PURE__ */ jsx("p", { className: "text-red-800 text-center", children: error }) }),
    userSubscription && !((_a = loaderData.plans) == null ? void 0 : _a.items.some(
      (plan) => plan.prices[0].id === userSubscription.polarPriceId
    )) && /* @__PURE__ */ jsx("div", { className: "mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md max-w-md mx-auto", children: /* @__PURE__ */ jsx("p", { className: "text-amber-800 text-center text-sm", children: "You have an active subscription that's not shown above. Contact support for assistance." }) })
  ] }) });
}
const members = [
  {
    name: "Michael Shimeles",
    role: "Co-Founder & CEO",
    avatar: "https://pbs.twimg.com/profile_images/1927552295291564033/U8DD7JlB_400x400.jpg"
  },
  {
    name: "Ras Mic",
    role: "Co-Founder & CTO",
    avatar: "https://pbs.twimg.com/media/GsOcrswWMAALjCG?format=jpg&name=medium"
  },
  {
    name: "Micky",
    role: "Co-Founder & CMO",
    avatar: "https://pbs.twimg.com/media/GrQYfZ7WAAAMy7i?format=jpg&name=medium"
  },
  {
    name: "Mike",
    role: "Co-Founder & COO",
    avatar: "https://pbs.twimg.com/media/GoRePdpXEAAb06Q?format=jpg&name=4096x4096"
  }
];
function TeamSection() {
  return /* @__PURE__ */ jsx("section", { id: "team", className: "py-12 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-8 lg:px-0", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-8 text-4xl font-bold md:mb-16 lg:text-5xl", children: "Our team" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-6 text-lg font-medium", children: "Leadership" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4", children: members.map((member, index2) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "aspect-square rounded-full object-cover",
            src: member.avatar,
            alt: member.name,
            height: "460",
            width: "460",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "mt-2 block text-sm", children: member.name }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground block text-xs", children: member.role })
      ] }, index2)) })
    ] })
  ] }) });
}
function meta({}) {
  const title = "React Starter Kit - Launch Your SAAS Quickly";
  const description = "This powerful starter kit is designed to help you launch your SAAS application quickly and efficiently.";
  const keywords = "React, Starter Kit, SAAS, Launch, Quickly, Efficiently";
  const siteUrl = "https://www.reactstarter.xyz/";
  const imageUrl = "https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/rsk-image-FcUcfBMBgsjNLo99j3NhKV64GT2bQl.png";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // Open Graph / Facebook
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:width",
      content: "1200"
    },
    {
      property: "og:image:height",
      content: "630"
    },
    {
      property: "og:url",
      content: siteUrl
    },
    {
      property: "og:site_name",
      content: "React Starter Kit"
    },
    {
      property: "og:image",
      content: imageUrl
    },
    // Twitter Card
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "keywords",
      content: keywords
    },
    {
      name: "author",
      content: "Ras Mic"
    },
    {
      name: "favicon",
      content: imageUrl
    }
  ];
}
async function loader$1(args) {
  const {
    userId
  } = await getAuth(args);
  const [subscriptionData, plans] = await Promise.all([userId ? fetchQuery(api.subscriptions.checkUserSubscriptionStatus, {
    userId
  }).catch((error) => {
    console.error("Failed to fetch subscription data:", error);
    return null;
  }) : Promise.resolve(null), fetchAction(api.subscriptions.getAvailablePlans)]);
  return {
    isSignedIn: !!userId,
    hasActiveSubscription: (subscriptionData == null ? void 0 : subscriptionData.hasActiveSubscription) || false,
    plans
  };
}
const home = withComponentProps(function Home({
  loaderData
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(IntegrationsSection, {
      loaderData
    }), /* @__PURE__ */ jsx(ContentSection, {}), /* @__PURE__ */ jsx(TeamSection, {}), /* @__PURE__ */ jsx(Pricing, {
      loaderData
    }), /* @__PURE__ */ jsx(FooterSection, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const signIn = withComponentProps(function SignInPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex items-center justify-center h-screen",
    children: /* @__PURE__ */ jsx(SignIn, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signIn
}, Symbol.toStringTag, { value: "Module" }));
const signUp = withComponentProps(function SignUpPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex items-center justify-center h-screen",
    children: /* @__PURE__ */ jsx(SignUp, {})
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signUp
}, Symbol.toStringTag, { value: "Module" }));
const pricing = withComponentProps(function IntegratedPricing() {
  const {
    isSignedIn,
    userId
  } = useAuth();
  const [loadingPriceId, setLoadingPriceId] = useState(null);
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const getPlans = useAction(api.subscriptions.getAvailablePlans);
  const subscriptionStatus = useQuery(api.subscriptions.checkUserSubscriptionStatus, {
    userId: isSignedIn ? userId : void 0
  });
  const userSubscription = useQuery(api.subscriptions.fetchUserSubscription);
  const createCheckout = useAction(api.subscriptions.createCheckoutSession);
  const createPortalUrl = useAction(api.subscriptions.createCustomerPortalUrl);
  const upsertUser = useMutation(api.users.upsertUser);
  React.useEffect(() => {
    if (isSignedIn) {
      upsertUser().catch(console.error);
    }
  }, [isSignedIn, upsertUser]);
  React.useEffect(() => {
    const loadPlans = async () => {
      try {
        const result = await getPlans();
        setPlans(result);
      } catch (error2) {
        console.error("Failed to load plans:", error2);
        setError("Failed to load pricing plans. Please try again.");
      }
    };
    loadPlans();
  }, [getPlans]);
  const handleSubscribe = async (priceId) => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }
    setLoadingPriceId(priceId);
    setError(null);
    try {
      await upsertUser();
      if ((userSubscription == null ? void 0 : userSubscription.status) === "active" && (userSubscription == null ? void 0 : userSubscription.customerId)) {
        const portalResult = await createPortalUrl({
          customerId: userSubscription.customerId
        });
        window.open(portalResult.url, "_blank");
        setLoadingPriceId(null);
        return;
      }
      const checkoutUrl = await createCheckout({
        priceId
      });
      window.location.href = checkoutUrl;
    } catch (error2) {
      console.error("Failed to process subscription action:", error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Failed to process request. Please try again.";
      setError(errorMessage);
      setLoadingPriceId(null);
    }
  };
  if (!plans) {
    return /* @__PURE__ */ jsxs("section", {
      className: "flex flex-col items-center justify-center min-h-screen px-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsx(Loader2, {
          className: "h-4 w-4 animate-spin"
        }), /* @__PURE__ */ jsx("span", {
          children: "Loading plans..."
        })]
      }), error && /* @__PURE__ */ jsx("p", {
        className: "text-red-500 mt-4 text-center",
        children: error
      })]
    });
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center justify-center min-h-screen px-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "text-center mb-12",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-bold tracking-tight mb-4",
        children: "Simple, transparent pricing"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl text-muted-foreground",
        children: "Choose the plan that fits your needs"
      }), isSignedIn && !(subscriptionStatus == null ? void 0 : subscriptionStatus.hasActiveSubscription) && /* @__PURE__ */ jsxs("div", {
        className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-blue-800 font-medium",
          children: "📋 Complete your setup"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-blue-700 text-sm mt-1",
          children: "You're signed in! Choose a plan below to access your dashboard and start using all features."
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full",
      children: plans.items.sort((a, b) => {
        const priceComparison = a.prices[0].amount - b.prices[0].amount;
        return priceComparison !== 0 ? priceComparison : a.name.localeCompare(b.name);
      }).map((plan, index2) => {
        const isPopular = plans.items.length === 2 ? index2 === 1 : index2 === Math.floor(plans.items.length / 2);
        const price = plan.prices[0];
        const isCurrentPlan = (userSubscription == null ? void 0 : userSubscription.status) === "active" && (userSubscription == null ? void 0 : userSubscription.amount) === price.amount;
        return /* @__PURE__ */ jsxs(Card, {
          className: `relative h-fit ${isPopular ? "border-primary" : ""} ${isCurrentPlan ? "border-green-500 bg-green-50/50" : ""}`,
          children: [isPopular && !isCurrentPlan && /* @__PURE__ */ jsx("div", {
            className: "absolute -top-3 left-1/2 transform -translate-x-1/2",
            children: /* @__PURE__ */ jsx("span", {
              className: "bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium",
              children: "Most Popular"
            })
          }), isCurrentPlan && /* @__PURE__ */ jsx("div", {
            className: "absolute -top-3 left-1/2 transform -translate-x-1/2",
            children: /* @__PURE__ */ jsx("span", {
              className: "bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium",
              children: "Current Plan"
            })
          }), /* @__PURE__ */ jsxs(CardHeader, {
            children: [/* @__PURE__ */ jsx(CardTitle, {
              className: "text-2xl",
              children: plan.name
            }), /* @__PURE__ */ jsx(CardDescription, {
              children: plan.description
            }), /* @__PURE__ */ jsxs("div", {
              className: "mt-4",
              children: [/* @__PURE__ */ jsxs("span", {
                className: "text-4xl font-bold",
                children: ["$", (price.amount / 100).toFixed(0)]
              }), /* @__PURE__ */ jsxs("span", {
                className: "text-muted-foreground",
                children: ["/", price.interval || "month"]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CardContent, {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3",
              children: [/* @__PURE__ */ jsx(Check, {
                className: "h-5 w-5 text-green-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "All features included"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3",
              children: [/* @__PURE__ */ jsx(Check, {
                className: "h-5 w-5 text-green-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Priority support"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3",
              children: [/* @__PURE__ */ jsx(Check, {
                className: "h-5 w-5 text-green-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Cancel anytime"
              })]
            }), plan.isRecurring && /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3",
              children: [/* @__PURE__ */ jsx(Check, {
                className: "h-5 w-5 text-green-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Recurring billing"
              })]
            })]
          }), /* @__PURE__ */ jsx(CardFooter, {
            children: /* @__PURE__ */ jsx(Button, {
              className: "w-full",
              onClick: () => handleSubscribe(price.id),
              disabled: loadingPriceId === price.id,
              variant: isCurrentPlan ? "secondary" : "default",
              children: loadingPriceId === price.id ? /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx(Loader2, {
                  className: "mr-2 h-4 w-4 animate-spin"
                }), "Setting up checkout..."]
              }) : isCurrentPlan ? "✓ Current Plan" : (userSubscription == null ? void 0 : userSubscription.status) === "active" ? (() => {
                const currentAmount = userSubscription.amount || 0;
                const newAmount = price.amount;
                if (newAmount > currentAmount) {
                  return `Upgrade (+$${((newAmount - currentAmount) / 100).toFixed(0)}/mo)`;
                } else if (newAmount < currentAmount) {
                  return `Downgrade (-$${((currentAmount - newAmount) / 100).toFixed(0)}/mo)`;
                } else {
                  return "Manage Plan";
                }
              })() : "Get Started"
            })
          })]
        }, plan.id);
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "mt-12 text-center",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-muted-foreground",
        children: ["Need a custom plan?", " ", /* @__PURE__ */ jsx("span", {
          className: "text-primary cursor-pointer hover:underline",
          children: "Contact us"
        })]
      }), error && /* @__PURE__ */ jsx("div", {
        className: "mt-8 p-4 bg-red-50 border border-red-200 rounded-md",
        children: /* @__PURE__ */ jsx("p", {
          className: "text-red-800 text-center",
          children: error
        })
      }), userSubscription && !(plans == null ? void 0 : plans.items.some((plan) => plan.prices[0].id === userSubscription.polarPriceId)) && /* @__PURE__ */ jsx("div", {
        className: "mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md max-w-md mx-auto",
        children: /* @__PURE__ */ jsx("p", {
          className: "text-amber-800 text-center text-sm",
          children: "You have an active subscription that's not shown above. Contact support for assistance."
        })
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pricing
}, Symbol.toStringTag, { value: "Module" }));
const success = withComponentProps(function Success() {
  const {
    isSignedIn
  } = useAuth();
  const subscription = useQuery(api.subscriptions.fetchUserSubscription);
  const upsertUser = useMutation(api.users.upsertUser);
  useEffect(() => {
    if (isSignedIn) {
      upsertUser();
    }
  }, [isSignedIn, upsertUser]);
  if (!isSignedIn) {
    return /* @__PURE__ */ jsx("section", {
      className: "flex flex-col items-center justify-center min-h-screen px-4",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "max-w-md w-full text-center",
        children: [/* @__PURE__ */ jsxs(CardHeader, {
          children: [/* @__PURE__ */ jsx(CardTitle, {
            className: "text-2xl",
            children: "Access Denied"
          }), /* @__PURE__ */ jsx(CardDescription, {
            children: "Please sign in to view your subscription details."
          })]
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsx(Button, {
            asChild: true,
            className: "w-full",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/sign-in",
              children: "Sign In"
            })
          })
        })]
      })
    });
  }
  if (!subscription) {
    return /* @__PURE__ */ jsx("section", {
      className: "flex flex-col items-center justify-center min-h-screen px-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsx(Loader2, {
          className: "h-4 w-4 animate-spin"
        }), /* @__PURE__ */ jsx("span", {
          children: "Loading your subscription details..."
        })]
      })
    });
  }
  return /* @__PURE__ */ jsx("section", {
    className: "flex flex-col items-center justify-center min-h-screen px-4",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "max-w-2xl w-full text-center",
      children: [/* @__PURE__ */ jsxs(CardHeader, {
        className: "pb-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "mx-auto mb-4",
          children: /* @__PURE__ */ jsx(CheckCircle, {
            className: "h-16 w-16 text-green-500"
          })
        }), /* @__PURE__ */ jsx(CardTitle, {
          className: "text-3xl font-bold",
          children: "Welcome to your subscription!"
        }), /* @__PURE__ */ jsx(CardDescription, {
          className: "text-lg",
          children: "Your payment was successful and your subscription is now active."
        })]
      }), /* @__PURE__ */ jsxs(CardContent, {
        className: "space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-muted rounded-lg p-6 text-left",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "font-semibold text-lg mb-4",
            children: "Subscription Details"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Status:"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-medium capitalize",
                children: subscription.status
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Amount:"
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-medium",
                children: ["$", subscription.amount ? (subscription.amount / 100).toFixed(2) : "0.00", " ", subscription.currency ? subscription.currency.toUpperCase() : "USD"]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Billing Cycle:"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-medium capitalize",
                children: subscription.interval
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Next Billing:"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-medium",
                children: subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "N/A"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "font-semibold text-lg",
            children: "What's Next?"
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid gap-4 md:grid-cols-2",
            children: [/* @__PURE__ */ jsx(Button, {
              asChild: true,
              className: "w-full",
              children: /* @__PURE__ */ jsx(Link, {
                to: (subscription == null ? void 0 : subscription.status) === "active" ? "/dashboard" : "/pricing",
                children: (subscription == null ? void 0 : subscription.status) === "active" ? /* @__PURE__ */ jsxs(Fragment, {
                  children: ["Go to Dashboard", /* @__PURE__ */ jsx(ArrowRight, {
                    className: "ml-2 h-4 w-4"
                  })]
                }) : "View Pricing"
              })
            }), /* @__PURE__ */ jsx(Button, {
              asChild: true,
              variant: "outline",
              className: "w-full",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/",
                children: "Back to Home"
              })
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "pt-6 border-t",
          children: /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: (subscription == null ? void 0 : subscription.status) === "active" ? "You'll receive a confirmation email shortly. If you have any questions, feel free to contact our support team." : "Your payment is processing. It may take a few minutes for your subscription to activate. Please refresh the page or try again shortly."
          })
        })]
      })]
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: success
}, Symbol.toStringTag, { value: "Module" }));
const subscriptionRequired = withComponentProps(function SubscriptionRequired() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center p-4",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "max-w-lg w-full text-center",
      children: [/* @__PURE__ */ jsxs(CardHeader, {
        className: "pb-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "mx-auto mb-4",
          children: /* @__PURE__ */ jsx(Lock, {
            className: "h-16 w-16 text-orange-500"
          })
        }), /* @__PURE__ */ jsx(CardTitle, {
          className: "text-2xl font-bold",
          children: "Subscription Required"
        }), /* @__PURE__ */ jsx(CardDescription, {
          className: "text-lg",
          children: "You need an active subscription to access the dashboard."
        })]
      }), /* @__PURE__ */ jsxs(CardContent, {
        className: "space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-muted rounded-lg p-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-center gap-2 mb-3",
            children: [/* @__PURE__ */ jsx(CreditCard, {
              className: "h-5 w-5 text-muted-foreground"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "Choose Your Plan"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Select a subscription plan to unlock full access to your dashboard, analytics, and all premium features."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-3",
          children: [/* @__PURE__ */ jsx(Button, {
            asChild: true,
            className: "w-full",
            size: "lg",
            children: /* @__PURE__ */ jsxs("a", {
              href: "/pricing",
              children: ["View Pricing Plans", /* @__PURE__ */ jsx(ArrowRight, {
                className: "ml-2 h-4 w-4"
              })]
            })
          }), /* @__PURE__ */ jsx(Button, {
            asChild: true,
            variant: "outline",
            className: "w-full",
            children: /* @__PURE__ */ jsx("a", {
              href: "/",
              children: "Back to Home"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "pt-4 border-t",
          children: /* @__PURE__ */ jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Already subscribed? It may take a few moments for your subscription to activate. Try refreshing the page."
          })
        })]
      })]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: subscriptionRequired
}, Symbol.toStringTag, { value: "Module" }));
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
const NavMain = memo(({
  items
}) => {
  const location = useLocation();
  const navItems = useMemo(
    () => items.map((item) => ({
      ...item,
      isActive: location.pathname === item.url
    })),
    [items, location.pathname]
  );
  return /* @__PURE__ */ jsx(SidebarGroup, { children: /* @__PURE__ */ jsx(SidebarGroupContent, { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsx(SidebarMenu, { children: navItems.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
    SidebarMenuButton,
    {
      tooltip: item.title,
      isActive: item.isActive,
      asChild: true,
      children: /* @__PURE__ */ jsxs(Link, { to: item.url, prefetch: "intent", children: [
        item.icon && /* @__PURE__ */ jsx(item.icon, {}),
        /* @__PURE__ */ jsx("span", { children: item.title })
      ] })
    }
  ) }, item.title)) }) }) });
});
function NavSecondary({
  items,
  ...props
}) {
  const location = useLocation();
  return /* @__PURE__ */ jsx(SidebarGroup, { ...props, children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => {
    const isActive = location.pathname === item.url || item.url.startsWith("/dashboard") && location.pathname.startsWith(item.url);
    const isImplemented = item.url !== "#";
    return /* @__PURE__ */ jsx(SidebarMenuItem, { children: isImplemented ? /* @__PURE__ */ jsx(SidebarMenuButton, { isActive, asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: item.url, prefetch: "intent", children: [
      /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }) : /* @__PURE__ */ jsxs(SidebarMenuButton, { disabled: true, children: [
      /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }, item.title);
  }) }) }) });
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function NavUser({ user }) {
  var _a, _b;
  const { isMobile } = useSidebar();
  const userFullName = user.firstName + " " + user.lastName;
  const userEmail = user.emailAddresses[0].emailAddress;
  const userInitials = (((_a = user == null ? void 0 : user.firstName) == null ? void 0 : _a.charAt(0)) || "").toUpperCase() + (((_b = user == null ? void 0 : user.lastName) == null ? void 0 : _b.charAt(0)) || "").toUpperCase();
  const userProfile = user.imageUrl;
  const { signOut } = useClerk();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
        children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-lg", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: userProfile, alt: userFullName }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg", children: userInitials })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: userFullName }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: userEmail })
          ] }),
          /* @__PURE__ */ jsx(IconDotsVertical, { className: "ml-auto size-4" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        className: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
        side: isMobile ? "bottom" : "right",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-lg", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: userProfile, alt: userFullName }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg", children: userInitials })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: userFullName }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: userEmail })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(IconUserCircle, {}),
              "Account"
            ] }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(SettingsIcon, {}),
              "Settings"
            ] })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => signOut({ redirectUrl: "/" }), children: [
            /* @__PURE__ */ jsx(IconLogout, {}),
            "Sign Out"
          ] })
        ]
      }
    )
  ] }) }) });
}
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard
    },
    {
      title: "Chat",
      url: "/dashboard/chat",
      icon: MessageCircle
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings
    }
  ]
};
function AppSidebar({
  variant,
  user
}) {
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "offcanvas", variant, children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(Link, { to: "/", prefetch: "viewport", children: /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "Ras Mic Inc." }) }) }) }) }),
    /* @__PURE__ */ jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsx(NavMain, { items: data.navMain }),
      /* @__PURE__ */ jsx(NavSecondary, { items: data.navSecondary, className: "mt-auto" })
    ] }),
    /* @__PURE__ */ jsx(SidebarFooter, { children: user && /* @__PURE__ */ jsx(NavUser, { user }) })
  ] });
}
function SiteHeader() {
  return /* @__PURE__ */ jsx("header", { className: "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6", children: [
    /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
    /* @__PURE__ */ jsx(
      Separator,
      {
        orientation: "vertical",
        className: "mx-2 data-[orientation=vertical]:h-4"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, size: "sm", className: "hidden sm:flex", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com/michaelshimeles/react-starter-kit",
        rel: "noopener noreferrer",
        target: "_blank",
        className: "dark:text-foreground",
        children: "GitHub"
      }
    ) }) })
  ] }) });
}
async function loader(args) {
  const {
    userId
  } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const [subscriptionStatus, user] = await Promise.all([fetchQuery(api.subscriptions.checkUserSubscriptionStatus, {
    userId
  }), createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
  }).users.getUser(userId)]);
  if (!(subscriptionStatus == null ? void 0 : subscriptionStatus.hasActiveSubscription)) {
    throw redirect("/subscription-required");
  }
  return {
    user
  };
}
const layout = withComponentProps(function DashboardLayout() {
  const {
    user
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(SidebarProvider, {
    style: {
      "--sidebar-width": "calc(var(--spacing) * 72)",
      "--header-height": "calc(var(--spacing) * 12)"
    },
    children: [/* @__PURE__ */ jsx(AppSidebar, {
      variant: "inset",
      user
    }), /* @__PURE__ */ jsxs(SidebarInset, {
      children: [/* @__PURE__ */ jsx(SiteHeader, {}), /* @__PURE__ */ jsx(Outlet, {})]
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  const sanitizedId = id.replace(/[^a-zA-Z0-9-_]/g, "");
  const sanitizeColor = (color) => {
    const validColorPattern = /^(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-zA-Z]+)$/;
    return validColorPattern.test(color) ? color : "transparent";
  };
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${sanitizedId}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            if (!color) return null;
            const sanitizedKey = key.replace(/[^a-zA-Z0-9-_]/g, "");
            const sanitizedColor = sanitizeColor(color);
            return `  --color-${sanitizedKey}: ${sanitizedColor};`;
          }).filter(Boolean).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    var _a;
    if (hideLabel || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || (item == null ? void 0 : item.dataKey) || (item == null ? void 0 : item.name) || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index2) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index2, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      className: cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      children
    }
  );
}
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 }
];
const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)"
  }
};
function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = /* @__PURE__ */ new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Total Visitors" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        /* @__PURE__ */ jsx("span", { className: "hidden @[540px]/card:block", children: "Total for the last 3 months" }),
        /* @__PURE__ */ jsx("span", { className: "@[540px]/card:hidden", children: "Last 3 months" })
      ] }),
      /* @__PURE__ */ jsxs(CardAction, { children: [
        /* @__PURE__ */ jsxs(
          ToggleGroup,
          {
            type: "single",
            value: timeRange,
            onValueChange: setTimeRange,
            variant: "outline",
            className: "hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex",
            children: [
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "90d", children: "Last 3 months" }),
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "30d", children: "Last 30 days" }),
              /* @__PURE__ */ jsx(ToggleGroupItem, { value: "7d", children: "Last 7 days" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [
          /* @__PURE__ */ jsx(
            SelectTrigger,
            {
              className: "flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden",
              size: "sm",
              "aria-label": "Select a value",
              children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Last 3 months" })
            }
          ),
          /* @__PURE__ */ jsxs(SelectContent, { className: "rounded-xl", children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "90d", className: "rounded-lg", children: "Last 3 months" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "30d", className: "rounded-lg", children: "Last 30 days" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "7d", className: "rounded-lg", children: "Last 7 days" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "px-2 pt-4 sm:px-6 sm:pt-6", children: /* @__PURE__ */ jsx(
      ChartContainer,
      {
        config: chartConfig,
        className: "aspect-auto h-[250px] w-full",
        children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "fillDesktop", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--color-desktop)",
                  stopOpacity: 1
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--color-desktop)",
                  stopOpacity: 0.1
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "fillMobile", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--color-mobile)",
                  stopOpacity: 0.8
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--color-mobile)",
                  stopOpacity: 0.1
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "date",
              tickLine: false,
              axisLine: false,
              tickMargin: 8,
              minTickGap: 32,
              tickFormatter: (value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ChartTooltip,
            {
              cursor: false,
              defaultIndex: isMobile ? -1 : 10,
              content: /* @__PURE__ */ jsx(
                ChartTooltipContent,
                {
                  labelFormatter: (value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });
                  },
                  indicator: "dot"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              dataKey: "mobile",
              type: "natural",
              fill: "url(#fillMobile)",
              stroke: "var(--color-mobile)",
              stackId: "a"
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              dataKey: "desktop",
              type: "natural",
              fill: "url(#fillDesktop)",
              stroke: "var(--color-desktop)",
              stackId: "a"
            }
          )
        ] })
      }
    ) })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function SectionCards() {
  return /* @__PURE__ */ jsxs("div", { className: "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4", children: [
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total Revenue" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "$1,250.00" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+12.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Trending up this month ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Visitors for the last 6 months" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "New Customers" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "1,234" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingDown, {}),
          "-20%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Down 20% this period ",
          /* @__PURE__ */ jsx(IconTrendingDown, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Acquisition needs attention" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Active Accounts" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "45,678" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+12.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Strong user retention ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Engagement exceed targets" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "@container/card", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Growth Rate" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl", children: "4.5%" }),
        /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsx(IconTrendingUp, {}),
          "+4.5%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "line-clamp-1 flex gap-2 font-medium", children: [
          "Steady performance increase ",
          /* @__PURE__ */ jsx(IconTrendingUp, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Meets growth projections" })
      ] })
    ] })
  ] });
}
const index = withComponentProps(function Page() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-1 flex-col",
    children: /* @__PURE__ */ jsx("div", {
      className: "@container/main flex flex-1 flex-col gap-2",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-4 py-4 md:gap-6 md:py-6",
        children: [/* @__PURE__ */ jsx(SectionCards, {}), /* @__PURE__ */ jsx("div", {
          className: "px-4 lg:px-6",
          children: /* @__PURE__ */ jsx(ChartAreaInteractive, {})
        })]
      })
    })
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const CONVEX_SITE_URL = "https://example-convex.convex.cloud".replace(/.cloud$/, ".site");
const chat = withComponentProps(function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useChat({
    maxSteps: 10,
    api: `${CONVEX_SITE_URL}/api/chat`
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col w-full py-24 justify-center items-center",
    children: [/* @__PURE__ */ jsx("div", {
      className: "w-full max-w-xl space-y-4 mb-20",
      children: messages.map((message, i) => /* @__PURE__ */ jsx("div", {
        className: cn("flex", message.role === "user" ? "justify-end" : "justify-start"),
        children: /* @__PURE__ */ jsx("div", {
          className: cn("max-w-[65%] px-3 py-1.5 text-sm shadow-sm", message.role === "user" ? "bg-[#0B93F6] text-white rounded-2xl rounded-br-sm" : "bg-[#E9E9EB] text-black rounded-2xl rounded-bl-sm"),
          children: message.parts.map((part) => {
            switch (part.type) {
              case "text":
                return /* @__PURE__ */ jsx("div", {
                  className: "prose-sm prose-p:my-0.5 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1",
                  children: /* @__PURE__ */ jsx(Markdown, {
                    children: part.text
                  })
                }, `${message.id}-${i}`);
              default:
                return null;
            }
          })
        })
      }, message.id))
    }), /* @__PURE__ */ jsx("form", {
      className: "flex gap-2 justify-center w-full items-center fixed bottom-0",
      onSubmit: handleSubmit,
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-2 justify-center items-start mb-8 max-w-xl w-full border p-2 rounded-lg bg-white ",
        children: [/* @__PURE__ */ jsx(Input, {
          className: "w-full border-0 shadow-none !ring-transparent ",
          value: input,
          placeholder: "Say something...",
          onChange: handleInputChange
        }), /* @__PURE__ */ jsx("div", {
          className: "flex justify-end gap-3 items-center w-full",
          children: /* @__PURE__ */ jsx(Button, {
            size: "sm",
            className: "text-xs",
            children: "Send"
          })
        })]
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: chat
}, Symbol.toStringTag, { value: "Module" }));
function SubscriptionStatus() {
  const { isSignedIn } = useAuth();
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const subscription = useQuery(api.subscriptions.fetchUserSubscription);
  const subscriptionStatus = useQuery(
    api.subscriptions.checkUserSubscriptionStatus
  );
  const createPortalUrl = useAction(api.subscriptions.createCustomerPortalUrl);
  const handleManageSubscription = async () => {
    if (!(subscription == null ? void 0 : subscription.customerId)) return;
    setLoadingDashboard(true);
    try {
      const result = await createPortalUrl({
        customerId: subscription.customerId
      });
      window.open(result.url, "_blank");
    } catch (error) {
      console.error("Failed to open customer portal:", error);
    } finally {
      setLoadingDashboard(false);
    }
  };
  if (!isSignedIn) {
    return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Subscription Status" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Please sign in to view your subscription details" })
    ] }) });
  }
  if (!subscription) {
    return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Subscription Status" }),
      /* @__PURE__ */ jsx(CardDescription, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
        "Loading subscription details..."
      ] }) })
    ] }) });
  }
  if (!(subscriptionStatus == null ? void 0 : subscriptionStatus.hasActiveSubscription)) {
    return /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Subscription Status" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "You don't have an active subscription" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx("a", { href: "/pricing", children: "View Plans" }) }) })
    ] });
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "past_due":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        "Subscription Status",
        /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "outline",
            className: getStatusColor(subscription.status || "unknown"),
            children: subscription.status || "unknown"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Manage your subscription and billing" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Amount" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "$",
              subscription.amount ? (subscription.amount / 100).toFixed(2) : "0.00",
              " ",
              subscription.currency ? subscription.currency.toUpperCase() : "USD"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Next Billing" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "N/A" })
          ] })
        ] })
      ] }),
      subscription.cancelAtPeriodEnd && /* @__PURE__ */ jsx("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-md", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-800", children: "Your subscription will be canceled at the end of the current billing period." }) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleManageSubscription,
          disabled: loadingDashboard || !subscription.customerId,
          className: "flex-1",
          children: loadingDashboard ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Loading..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
            "Manage Subscription"
          ] })
        }
      ) })
    ] })
  ] });
}
const settings = withComponentProps(function Page2() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-1 flex-col",
    children: /* @__PURE__ */ jsx("div", {
      className: "@container/main flex flex-1 flex-col gap-2",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-col gap-4 py-4 md:gap-6 md:py-6",
        children: /* @__PURE__ */ jsx("div", {
          className: "px-4 lg:px-6",
          children: /* @__PURE__ */ jsx(SubscriptionStatus, {})
        })
      })
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-h_nZEHvu.js", "imports": ["/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/index-Bo2edEgN.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BvPpFlch.js", "imports": ["/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/index-Bo2edEgN.js", "/assets/with-props-CzSI8F6l.js", "/assets/use_queries-B9NbwxMJ.js", "/assets/index-B0u-20DM.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/index-C-moV2d0.js"], "css": ["/assets/root-DaYKh7fN.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Dp9yjFz1.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/button-CbpcyQgn.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/utils-DY3ni-Ar.js", "/assets/x-mBDL-h06.js", "/assets/index-B0u-20DM.js", "/assets/card-4HOsPCDQ.js", "/assets/api-DIz6I-RT.js", "/assets/use_queries-B9NbwxMJ.js", "/assets/check-BjmuTz2H.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/index-Bo2edEgN.js", "/assets/index-C-moV2d0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sign-in": { "id": "routes/sign-in", "parentId": "root", "path": "sign-in/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sign-in-D2xb9TQD.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/uiComponents-_M6Ub4lT.js", "/assets/index-B0u-20DM.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/index-C-moV2d0.js", "/assets/index-Bo2edEgN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sign-up": { "id": "routes/sign-up", "parentId": "root", "path": "sign-up/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sign-up-C-SD2PzR.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/uiComponents-_M6Ub4lT.js", "/assets/index-B0u-20DM.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/index-C-moV2d0.js", "/assets/index-Bo2edEgN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pricing": { "id": "routes/pricing", "parentId": "root", "path": "pricing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/pricing-B_aHe-kI.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/button-CbpcyQgn.js", "/assets/card-4HOsPCDQ.js", "/assets/api-DIz6I-RT.js", "/assets/use_queries-B9NbwxMJ.js", "/assets/check-BjmuTz2H.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/utils-DY3ni-Ar.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/index-C-moV2d0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/success": { "id": "routes/success", "parentId": "root", "path": "success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/success-CCr73JNI.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/button-CbpcyQgn.js", "/assets/card-4HOsPCDQ.js", "/assets/api-DIz6I-RT.js", "/assets/use_queries-B9NbwxMJ.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/arrow-right-D7VU-fpb.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/utils-DY3ni-Ar.js", "/assets/index-C-moV2d0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/subscription-required": { "id": "routes/subscription-required", "parentId": "root", "path": "subscription-required", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/subscription-required-Vcpi8aXx.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/button-CbpcyQgn.js", "/assets/card-4HOsPCDQ.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/credit-card-B-o48_my.js", "/assets/arrow-right-D7VU-fpb.js", "/assets/utils-DY3ni-Ar.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/layout": { "id": "routes/dashboard/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/layout-CKLo4S1k.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/utils-DY3ni-Ar.js", "/assets/index-DVJ9-J-v.js", "/assets/button-CbpcyQgn.js", "/assets/x-mBDL-h06.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/index-C-moV2d0.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/index-B0u-20DM.js", "/assets/index-Bo2edEgN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/index": { "id": "routes/dashboard/index", "parentId": "routes/dashboard/layout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-Velao6IY.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/index-DVJ9-J-v.js", "/assets/card-4HOsPCDQ.js", "/assets/utils-DY3ni-Ar.js", "/assets/index-Bo2edEgN.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/check-BjmuTz2H.js", "/assets/badge-BZ5YsinI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/chat": { "id": "routes/dashboard/chat", "parentId": "routes/dashboard/layout", "path": "dashboard/chat", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/chat-sHJSctXl.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/index-C-moV2d0.js", "/assets/button-CbpcyQgn.js", "/assets/utils-DY3ni-Ar.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/settings": { "id": "routes/dashboard/settings", "parentId": "routes/dashboard/layout", "path": "dashboard/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-BqaqbgFh.js", "imports": ["/assets/with-props-CzSI8F6l.js", "/assets/chunk-DQRVZFIR-CVQrgAzT.js", "/assets/button-CbpcyQgn.js", "/assets/card-4HOsPCDQ.js", "/assets/badge-BZ5YsinI.js", "/assets/api-DIz6I-RT.js", "/assets/use_queries-B9NbwxMJ.js", "/assets/credit-card-B-o48_my.js", "/assets/createLucideIcon-DrZpu-0l.js", "/assets/chunk-T2VIWQBM-TIbrgF64.js", "/assets/utils-DY3ni-Ar.js", "/assets/index-C-moV2d0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c60cda4c.js", "version": "c60cda4c", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/sign-in": {
    id: "routes/sign-in",
    parentId: "root",
    path: "sign-in/*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/sign-up": {
    id: "routes/sign-up",
    parentId: "root",
    path: "sign-up/*",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/pricing": {
    id: "routes/pricing",
    parentId: "root",
    path: "pricing",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/success": {
    id: "routes/success",
    parentId: "root",
    path: "success",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/subscription-required": {
    id: "routes/subscription-required",
    parentId: "root",
    path: "subscription-required",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/dashboard/layout": {
    id: "routes/dashboard/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/dashboard/index": {
    id: "routes/dashboard/index",
    parentId: "routes/dashboard/layout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/dashboard/chat": {
    id: "routes/dashboard/chat",
    parentId: "routes/dashboard/layout",
    path: "dashboard/chat",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/dashboard/settings": {
    id: "routes/dashboard/settings",
    parentId: "routes/dashboard/layout",
    path: "dashboard/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
