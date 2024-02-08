import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'

interface INote { id: string; date: Date; content: string }

export function App() {
  const [notes, setNotes] = useState<INote[]>(() => {
    const inMemoryNotes = localStorage.getItem('notes')

    return inMemoryNotes ? JSON.parse(inMemoryNotes) : []
  })

  const [search, setSearch] = useState('')

  function onCreateNote(content: string) {
    const newNote = { id: crypto.randomUUID(), date: new Date(), content }

    const newNotes = [newNote, ...notes]

    setNotes(newNotes)

    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  const showNotes = search !== ''
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt='NLW Expert' />

      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onCreateNote={onCreateNote} />

        {
          showNotes.map(note => <NoteCard key={note.id} note={note} />)
        }
      </div>
    </div>
  )
}
