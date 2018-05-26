const data =
  [
  {
    "type": "div",
    "childs": [
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "Support for Node.js debuggability "
          },
          {
            "type": "a",
            "childs": [
              {
                "type": "text",
                "text": "landed"
              }
            ]
          },
          {
            "type": "text",
            "text": " in Node.js in 2016. Here’s how to get up and running. "
          },
          {
            "type": "em",
            "childs": [
              {
                "type": "text",
                "text": "(Post updated Jan 2018)"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "1. Download and install the "
              }
            ]
          },
          {
            "type": "a",
            "childs": [
              {
                "type": "strong",
                "childs": [
                  {
                    "type": "text",
                    "text": "current version of node"
                  }
                ]
              }
            ]
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": ". "
              }
            ]
          },
          {
            "type": "text",
            "text": "(v6.3.0+ required)"
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "2. Run node with the "
              }
            ]
          },
          {
            "type": "code",
            "childs": [
              {
                "type": "strong",
                "childs": [
                  {
                    "type": "text",
                    "text": "--inspect"
                  }
                ]
              }
            ]
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": " flag:"
              }
            ]
          }
        ]
      },
      {
        "type": "pre",
        "childs": [
          {
            "type": "text",
            "text": "▸ "
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "node --inspect index.js"
              }
            ]
          }
        ]
      },
      {
        "type": "pre",
        "childs": [
          {
            "type": "text",
            "text": "# Break on the first statement of the script with --inspect-brk"
          }
        ]
      },
      {
        "type": "pre",
        "childs": [
          {
            "type": "text",
            "text": "▸ "
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "node --inspect-brk index.js"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "(In Node 6, you have to use "
          },
          {
            "type": "code",
            "childs": [
              {
                "type": "text",
                "text": "--inspect --debug-brk"
              }
            ]
          },
          {
            "type": "text",
            "text": " for this inspect & pseudo-breakpoint combo.)"
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "em",
            "childs": [
              {
                "type": "text",
                "text": "Next, you used to open the big "
              }
            ]
          },
          {
            "type": "code",
            "childs": [
              {
                "type": "em",
                "childs": [
                  {
                    "type": "text",
                    "text": "chrome-devtools://"
                  }
                ]
              }
            ]
          },
          {
            "type": "em",
            "childs": [
              {
                "type": "text",
                "text": " URL it spits out, "
              }
            ]
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "em",
                "childs": [
                  {
                    "type": "text",
                    "text": "but don’t"
                  }
                ]
              }
            ]
          },
          {
            "type": "em",
            "childs": [
              {
                "type": "text",
                "text": ". Now there’s a better way…"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "3. Open "
              }
            ]
          },
          {
            "type": "code",
            "childs": [
              {
                "type": "strong",
                "childs": [
                  {
                    "type": "text",
                    "text": "about:inspect"
                  }
                ]
              }
            ]
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": " in Chrome"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "It’ll redirect you to "
          },
          {
            "type": "code",
            "childs": [
              {
                "type": "text",
                "text": "chrome://inspect"
              }
            ]
          },
          {
            "type": "text",
            "text": " quickly and you’ll see something like:"
          }
        ]
      },
      {
        "type": "figure",
        "childs": [
          {
            "type": "div",
            "childs": [
              {
                "type": "img",
                "text": "",
                "src": "https://cdn-images-1.medium.com/max/1600/1*x4VXx50dLdD_HbqE6hpIRw.png"
              }
            ]
          },
          {
            "type": "figcaption",
            "childs": [
              {
                "type": "text",
                "text": "chrome://inspect screenshot"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "4. Click the "
              },
              {
                "type": "em",
                "childs": [
                  {
                    "type": "text",
                    "text": "Open dedicated DevTools for Node"
                  }
                ]
              },
              {
                "type": "text",
                "text": " link."
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "You’ll get a popup window for debugging your node session."
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "But better than that, when you kill and restart node, "
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "text",
                "text": "the window will automatically reconnect"
              }
            ]
          },
          {
            "type": "text",
            "text": " to it. 🔁🔁💥"
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "(Btw: the "
          },
          {
            "type": "strong",
            "childs": [
              {
                "type": "em",
                "childs": [
                  {
                    "type": "text",
                    "text": "inspect"
                  }
                ]
              }
            ]
          },
          {
            "type": "text",
            "text": "link beneath the specific target will only apply for that session of node and won’t reconnect.)"
          }
        ]
      },
      {
        "type": "figure",
        "childs": [
          {
            "type": "div",
            "childs": [
              {
                "type": "img",
                "text": "",
                "src": "https://cdn-images-1.medium.com/max/1600/1*iHurZ1VUsM54zGjZJHqexQ.png"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "In DevTools, now connected to Node, you’ll have all the Chrome DevTools features you’re used to:"
          }
        ]
      },
      {
        "type": "ul",
        "childs": [
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Complete breakpoint debugging, stepping w/ blackboxing"
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Source maps for transpiled code"
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "LiveEdit: JavaScript hot-swap evaluation w/ V8"
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Console evaluation with ES6 feature/object support and "
              },
              {
                "type": "a",
                "childs": [
                  {
                    "type": "text",
                    "text": "custom object formatting"
                  }
                ]
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Sampling JavaScript profiler w/ flamechart"
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Heap snapshot inspection, heap allocation timeline, allocation profiling"
              }
            ]
          },
          {
            "type": "li",
            "childs": [
              {
                "type": "text",
                "text": "Asynchronous stacks for native promises"
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "childs": [
          {
            "type": "text",
            "text": "To see this in action, here’s my demo during the 2017 Node Summit:"
          }
        ]
      }
    ]
  }
]

export default data
