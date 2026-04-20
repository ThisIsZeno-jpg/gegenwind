'use client'

import { useEffect } from 'react'

export function ScrollAnimations() {
  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    revealEls.forEach(el => revealObserver.observe(el))

    // Stagger parents
    const staggerParents = document.querySelectorAll('.stagger-parent')
    const staggerObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-visible')
            staggerObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    staggerParents.forEach(el => staggerObserver.observe(el))

    return () => {
      revealObserver.disconnect()
      staggerObserver.disconnect()
    }
  }, [])

  return null
}
