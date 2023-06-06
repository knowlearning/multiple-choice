import { validate as validateUUID } from 'uuid'
import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import Customizer from './customizer.vue'
import Player from './player.vue'

window.Agent = browserAgent()

const id = window.location.pathname.slice(1)

if (validateUUID(id)) {
  const question = await Agent.download(id).then(r => r.json())
  vuePersistentComponent(Player, question, id)
}
else {
  vuePersistentComponent(Customizer)
}