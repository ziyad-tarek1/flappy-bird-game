{{/*
Expand the name of the chart.
*/}}
{{- define "flappy-bird.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified name.
*/}}
{{- define "flappy-bird.fullname" -}}
{{- printf "%s-%s" (include "flappy-bird.name" .) .Release.Name -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "flappy-bird.labels" -}}
app.kubernetes.io/name: {{ include "flappy-bird.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Expand the name of the service account.
*/}}
{{- define "flappy-bird.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "flappy-bird.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- default "default" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}
