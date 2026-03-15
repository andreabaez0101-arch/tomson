fx_version 'cerulean'
game "gta5"
lua54 'yes'

-- Info --
author 'Cyvix'
description 'A HUD Based Off Of New Leafs | https://discord.gg/cyvixdev'

-- Client --
client_script {
  'client/**.lua',
}

-- Shared --
shared_scripts {
   '@ox_lib/init.lua'
}
-- UI --
ui_page 'html/index.html'

-- UI --
files {
  'data/*',
  'html/**',
  'stream/circlemap.ytd'
}
