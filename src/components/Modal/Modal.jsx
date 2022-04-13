/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.css'

function Modal({ children, state, ...rest }) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {state && <ModalInner {...rest}>{children}</ModalInner>}
    </AnimatePresence>,
    document.getElementById('modal-root'),
  )
}

export default Modal

function ModalInner({ children, onClose }) {
  const escHandler = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }
  const cardVariants = { // анимация всплытия модалки
    start: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    end: {
      opacity: 0,
      scale: 0.5,
    },
  }

  const wrVariants = { // анимация обертки
    start: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        when: 'beforeChildren',
      },
    },
    end: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  }

  useEffect(() => {
    window.document.addEventListener('keydown', escHandler)

    return () => {
      window.document.removeEventListener('keydown', escHandler)
    }
  }, [])

  const closeClickHandler = () => { // закрыть модалку по клику
    onClose()
  }

  const innerClickHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <motion.div variants={wrVariants} initial="start" animate="show" exit="end" onClick={closeClickHandler} className={styles.wrapper}>
      <motion.div variants={cardVariants} initial="start" animate="show" exit="end" onClick={innerClickHandler} className={styles.inner}>
        <svg onClick={closeClickHandler} role="button" className={`bi bi-x-circle ${styles.icon}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        {children}
      </motion.div>
    </motion.div>
  )
}
