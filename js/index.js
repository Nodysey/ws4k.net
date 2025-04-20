const background = document.getElementById("parallax-background");

window.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        background.style.backgroundPosition = (`${scrollX / 2}px`) + " " + (`${scrollY / 2}px`);
        background.style.height = document.body.getBoundingClientRect().height + "px";
    });
});

const tooltip = document.querySelector("#tooltip");
document.addEventListener("mousemove", (e) => {
	const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
	const title = hoveredElement?.dataset.title || hoveredElement?.title || hoveredElement?.alt;
	
	tooltip.style.left = `${e.pageX + 4}px`;
	tooltip.style.top = `${e.pageY + 4}px`;

	if (title) {
		if (!hoveredElement.dataset.title) {
			hoveredElement.dataset.title = title;
		}
		hoveredElement.removeAttribute('title');
		tooltip.innerHTML = title;
		tooltip.style.opacity = 1;
		tooltip.style.rotate = "0deg";
	} else {
		tooltip.style.opacity = 0;
	}
});

() => {
  (
    () => {
      (
        () => {
          (
            () => {
              (
                () => {
                  (
                    () => {
                      (
                        () => {
                          (
                            () => {
                              (
                                () => {
                                  (
                                    () => {
                                      (
                                        () => {
                                          (
                                            () => {
                                              (
                                                () => {
                                                  (
                                                    () => {
                                                      (
                                                        () => {
                                                          (
                                                            () => {
                                                              (
                                                                () => {
                                                                  (
                                                                    () => {
                                                                      (
                                                                        () => {
                                                                          (
                                                                            () => {
                                                                              (
                                                                                () => {
                                                                                  (
                                                                                    () => {
                                                                                      (
                                                                                        () => {
                                                                                          (
                                                                                            () => {
                                                                                              (
                                                                                                () => {
                                                                                                  (
                                                                                                    () => {
                                                                                                      (
                                                                                                        () => {
                                                                                                          (
                                                                                                            () => {
                                                                                                              (
                                                                                                                () => {
                                                                                                                  (
                                                                                                                    () => {
                                                                                                                      (
                                                                                                                        () => {
                                                                                                                          (
                                                                                                                            () => {
                                                                                                                              (
                                                                                                                                () => {

                                                                                                                                }
                                                                                                                              )
                                                                                                                            }
                                                                                                                          )
                                                                                                                        }
                                                                                                                      )
                                                                                                                    }
                                                                                                                  )
                                                                                                                }
                                                                                                              )
                                                                                                            }
                                                                                                          )
                                                                                                        }
                                                                                                      )
                                                                                                    }
                                                                                                  )
                                                                                                }
                                                                                              )
                                                                                            }
                                                                                          )
                                                                                        }
                                                                                      )
                                                                                    }
                                                                                  )
                                                                                }
                                                                              )
                                                                            }
                                                                          )
                                                                        }
                                                                      )
                                                                    }
                                                                  )
                                                                }
                                                              )
                                                            }
                                                          )
                                                        }
                                                      )
                                                    }
                                                  )
                                                }
                                              )
                                            }
                                          )
                                        }
                                      )
                                    }
                                  )
                                }
                              )
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )
}

