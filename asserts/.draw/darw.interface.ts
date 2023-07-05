import { Canvas } from "canvas"

export interface IDrawWorker {
    canvas: Canvas

    toDataURL(): { dataUrl: string, [x: string]: any }
    init(data: any): this
}

export type TDrawWhich = 'pregnogram' | 'bmi' | 'fetus' | 'fetusNichd'

export type TDrawPoint = { x: number, y: number }

export interface IPregnogramData { items: { fundalHeight: string, week: string }[] }
export interface IBmiData {
    preBmi: string
    weight: string
    items: { week: string, weight: string }[]
}
export type IFetusData = {
    mlUltrasounds: {
        ac: 3
        afv: null
        bpd: 1
        checkdate: null
        efw: null
        fetal: "1"
        fetalMonitor: null
        fetalMovement: null
        fhr: null
        fl: 5
        gestationalWeek: "22"
        hc: 2
        hl: 4
        id: 2491
        note: null
        patientNo: null
        reportdate: null
        ubf: null

    }[]
}
export type IFetusNichdData = {
    mlUltrasounds: {
        ac: 3
        afv: null
        bpd: 1
        checkdate: null
        efw: null
        fetal: "1"
        fetalMonitor: null
        fetalMovement: null
        fhr: null
        fl: 5
        gestationalWeek: "22"
        hc: 2
        hl: 4
        id: 2491
        note: null
        patientNo: null
        reportdate: null
        ubf: null

    }[],
    type: 'bpd' | 'hc' | 'efw'
}

export interface IDrawRequestData {
    type: TDrawWhich
    PregnogramData?: IPregnogramData
    BmiData?: IBmiData
    FetusData?: IFetusData
    FetusNichdData?: IFetusNichdData
}

