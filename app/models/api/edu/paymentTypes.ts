export interface PaymentType {
  payment_type: string;
  dept: number;
}

export interface PaymentGraph {
  graf_id: number;
  fis_id_id: number;
  uid_fis_face: string;
  student_id: number;
  UID_student_id: string;
  num_dog: string;
  date_dog: string;
  UID_dog: string;
  grafic_pay: Payment[];
  fact_pay: RealPayment[];
}

export interface Payment {
  DataPay: string;
  Summa: number;
}

export interface RealPayment {
  DataPaySt: string;
  SummaSt: number;
  Return: boolean;
}

export interface PaymentQuestion {
  id: number;
  text: string;
  answer: string;
  date: string;
}
