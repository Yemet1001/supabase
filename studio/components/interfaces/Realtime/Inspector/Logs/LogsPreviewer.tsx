import { useState } from 'react'
import { QueryType } from './Logs.types'
import LogTable from './LogTable'
import PreviewFilterPanel from './PreviewFilterPanel'
import useRealtimeLogsPreview, { UseRealtimeLogsPreviewParams } from './useRealtimeLogsPreviewer'

/**
 * Acts as a container component for the entire log display
 *
 * ## Query Params Syncing
 * Query params are synced on query submission.
 *
 * params used are:
 * - `s` for search query.
 * - `te` for timestamp start value.
 */
interface RealtimeLogsPreviewerProps {
  projectRef: string
  queryType: QueryType
  condensedLayout?: boolean
}

export const RealtimeLogsPreviewer = ({
  projectRef,
  queryType,
  condensedLayout = false,
}: RealtimeLogsPreviewerProps) => {
  const [realtimeConfig, setRealtimeConfig] = useState<UseRealtimeLogsPreviewParams>({
    enabled: false,
    projectRef: '',
    channelName: 'room_a',
    logLevel: 'info',
    token: '',
    schema: 'public',
    table: '*',
    tableId: undefined,
    filter: undefined,
    bearer: null,
    enablePresence: true,
    enableDbChanges: true,
    enableBroadcast: true,
  })

  const { logData, sendEvent } = useRealtimeLogsPreview(realtimeConfig)

  return (
    <div className="flex flex-col flex-grow h-full">
      <PreviewFilterPanel
        condensedLayout={condensedLayout}
        config={realtimeConfig}
        onSetConfig={setRealtimeConfig}
        sendEvent={sendEvent}
      />
      <div className="relative flex flex-col flex-grow pt-4 h-full">
        <div className="flex h-full">
          <LogTable projectRef={projectRef} data={logData} queryType={queryType} />
        </div>
      </div>
    </div>
  )
}

export default RealtimeLogsPreviewer
