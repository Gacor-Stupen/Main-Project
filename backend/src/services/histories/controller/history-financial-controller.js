import FinancialHistoryRepository from "../repositories/history-financial-repositoreis.js";
import { getUserHistoriesCareer } from "./history-career-controller.js";
import CareerHistoryRepository from "../repositories/history-career-repositories.js";
import response from "../../../utils/response.js";

export const saveFinancialHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { historyId, finalReadinessScore } = req.body;

    if (!historyId || !finalReadinessScore) {
      return response(res, 400, "History ID and Final Readiness Score are required", null);
    }

    // Langsung simpan gabungan data dari Joi validator + finalReadinessScore dari body
    const newHistory = await FinancialHistoryRepository.createFinancialAnalysis({
      historyId,
      finalReadinessScore,
      ...req.validated, // monthlySavings, monthlyExpenses, dll.
    });

    return response(res, 201, "Financial history saved successfully!", newHistory);
  } catch (error) {
    console.error("Error in saveFinancialHistory:", error.message);
    return response(res, 500, "Internal server error", null);
  }
};

export const getUserHistoriesFinancial = async (req, res) => {
  try {
    const { id } = req.query;

    // Ambil data gabungan karir + finansial dari database
    const finacialHistories = await FinancialHistoryRepository.findById(id);

    if (!finacialHistories) {
      return response(res, 404, "Financial history not found", null);
    }

    const careerHistoryId = finacialHistories.career_history_id;
    const careerHistory = await CareerHistoryRepository.findById(careerHistoryId);

    return response(res, 200, "Fetch combined user histories success", {
      career_analysis: careerHistory,
      financial_analysis: finacialHistories,
    });
  } catch (error) {
    console.error("Error in getUserHistoriesFinancial controller:", error.message);
    return response(res, 500, "Internal server error", null);
  }
};
