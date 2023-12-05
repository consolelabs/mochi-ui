import fetch from 'node-fetch'

const TAGS = process.env.TAGS_INFO || '[]'
const host = process.env.HOST
const repo = process.env.REPO
const githubEvtName = process.env.GITHUB_EVENT_NAME || 'post-discord'
const releasedTime = process.env.RELEASED_TIME
const discordWebhook = process.env.DISCORD_WEBHOOK
const discordUsername = process.env.DISCORD_USERNAME
const discordAvatar = process.env.DISCORD_AVATAR

type TagType = {
  name: string
  version: string
  tag_name?: string
  ignore_npm_released?: boolean
}

function handleTags() {
  const tagsInfo: TagType[] = Array.from(JSON.parse(TAGS))
  const breakLine = '\n'
  const maximumDiscordContentThreshold = 3950
  const footer = `*Released at ${releasedTime}*`

  const contentInfo = tagsInfo.map((tag) => {
    const name = tag.name
    const version = tag.version
    const tagName = tag.tag_name

    const githubTagName = tagName || `${name}@${version}`
    const npmURLtemplate = 'https://www.npmjs.com/package/{name}/v/{version}'

    const npmLink = npmURLtemplate
      .replace('{name}', name)
      .replace('{version}', version)
    const githubURL = `${host}/${repo}/releases/tag/${encodeURIComponent(
      githubTagName,
    )}`

    const isIgnoreNPMReleased = tag.ignore_npm_released
    const packageName = isIgnoreNPMReleased
      ? `**${name}**`
      : `[**${name}**](${npmLink})`

    return `- ${packageName} was released to version: [**${version}**](${githubURL})`
  })
  const data = contentInfo.reduce<string[]>((acc, item, idx) => {
    const nextAcc = [...acc]
    const itemLength = item.length
    const currentItem = nextAcc.pop()
    const isLastItem = idx === contentInfo.length - 1
    const nextItem = currentItem ? `${currentItem}${breakLine}${item}` : item
    const nextItemWithFooter = isLastItem
      ? [nextItem, breakLine, footer].join('')
      : nextItem

    if (!currentItem) {
      return [nextItemWithFooter]
    }

    const nextLength = currentItem.length + itemLength
    if (nextLength > maximumDiscordContentThreshold) {
      const currentItemWithFooter = [currentItem, breakLine, footer].join('')
      return [...nextAcc, currentItemWithFooter, item]
    }

    return [...nextAcc, nextItemWithFooter]
  }, [])
  return data.map((d) => {
    return {
      title: 'New releases! 🚀🚀🚀',
      description: d,
      color: 1127128,
    }
  })
}

async function postWebhook(info: ReturnType<typeof handleTags>[number]) {
  if (!discordWebhook) {
    const err = new Error('DISCORD_WEBHOOK env was not provided!')
    console.error(err)
    process.exit(1)
  }
  const baseUrl = `${discordWebhook}?wait=true`
  const payload = JSON.stringify({
    embeds: [info],
    ...(discordUsername && { username: discordUsername }),
    ...(discordAvatar && { avatar_url: discordAvatar }),
  })

  try {
    console.log('Sending message ...')
    await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': githubEvtName,
      },
      body: payload,
    })
  } catch (err: any) {
    console.error('Error :', err?.response?.status, err?.response?.statusText)
    console.error('Message :', err.response ? err.response.data : err.message)
    process.exit(1)
  }
}

async function main() {
  const embeds = handleTags()
  if (!embeds.length) {
    return
  }

  const totalMsgToSend = embeds.length
  console.log(`${totalMsgToSend} messages to send`)

  await Promise.all(embeds.map((embed) => postWebhook(embed)))

  console.log('Messages sent !')

  process.exit(0)
}

main()
