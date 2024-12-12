import { Consult } from './consult';
import { Exam } from './exam';

export interface ConsultListExam {
  consult: Consult;
  lstExam: Exam[];
}
