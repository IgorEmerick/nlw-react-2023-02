import { Close, Content, Overlay, Portal, Root, Trigger } from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface INoteCardProps {
  note: {
    date: Date;
    content: string;
  }
}

export function NoteCard({ note: { content, date } }: INoteCardProps) {
  return (
    <Root>
      <Trigger className='rounded-md bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className='text-sm leading-6 text-slate-400'>
          {content}
        </p>

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
      </Trigger>

      <Portal>
        <Overlay className="inset-0 fixed bg-black/50" />
        <Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
            </span>

            <p className='text-sm leading-6 text-slate-400'>
              {content}
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </Content>
      </Portal>
    </Root>
  )
}