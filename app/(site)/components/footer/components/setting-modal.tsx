"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EngList } from "@/config/site"
import { useIndexStore } from "@/store"

interface SettingModalProps {
  TriggerChild: React.ReactNode
}

const SettingModal: React.FC<SettingModalProps> = ({ TriggerChild }) => {
  const { activeEng, setActiveEng } = useIndexStore()

  return (
    <Dialog>
      <DialogTrigger asChild>{TriggerChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>选择你喜欢的搜素引擎</DialogTitle>
          <DialogDescription>
            <RadioGroup defaultValue={activeEng.href} className="sm:grid-cols-2">
              {EngList.map(({ href, title, icon: Icon }) => (
                <div
                  className="flex items-center space-x-2"
                  key={title}
                  onClick={() => setActiveEng({ href, title, icon: Icon })}
                >
                  <RadioGroupItem value={href} id={title} />
                  <Label htmlFor={title} className="flex items-center justify-center gap-2">
                    <Icon className="size-6" />
                    {title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SettingModal
